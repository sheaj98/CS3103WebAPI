#!/usr/bin/env python3


from __future__ import print_function # In python 2.7
from ldap3 import Server, Connection, ALL
from ldap3.core.exceptions import *
from flask import Flask, jsonify, abort, request, make_response, session
from flask_restful import reqparse, Resource, Api
from flask_session import Session
from functools import wraps
import json
import sys
import pymysql
import pymysql.cursors
import sys
import ssl #include ssl libraries

import ssl
import cgitb
import cgi
import sys
cgitb.enable()

import settings # Our server and db settings, stored in settings.py

app = Flask(__name__, static_url_path='/static')
api = Api(app)

app.config['SECRET_KEY'] = settings.SECRET_KEY
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_COOKIE_NAME'] = 'peanutButter'
app.config['SESSION_COOKIE_DOMAIN'] = settings.APP_HOST

Session(app)


####################################################################################
#
# Error handlers
#
@app.errorhandler(400) # decorators to add to 400 response
def bad_request(error):
	return make_response(jsonify( { "status": "Bad request" } ), 400)

@app.errorhandler(404) # decorators to add to 404 response
def not_found(error):
	return make_response(jsonify( { "status": "Resource not found" } ), 404)

@app.errorhandler(401)
def not_authorized():
	return make_response(jsonify( { "status": "Not Authorized"}), 401)

####################################################################################
#
# Static Endpoints for humans
#
class Root(Resource):
   # get method. What might others be aptly named? (hint: post)
	def get(self):
		return app.send_static_file('index.html')

api.add_resource(Root,'/')

class Developer(Resource):
   # get method. What might others be aptly named? (hint: post)
	def get(self):
		return app.send_static_file('developer.html')

api.add_resource(Developer,'/dev')

def getDBConnection():
	return pymysql.connect(
				settings.DB_HOST,
				settings.DB_USER,
				settings.DB_PASSWD,
				settings.DB_DATABASE,
				charset='utf8mb4',
				cursorclass= pymysql.cursors.DictCursor)

def owner_decorator():
	def _owner_decorator(f):
		@wraps(f)
		def __owner_decorator(*func, **args):
			print("args: {0}".format(args))
			userId = args.get('userId')
			print("userId: {0}".format(userId))
			print("{0}".format(session))
			sessionUserId = session.get('userId', 'Not Auth')
			print("userId: {0}".format(sessionUserId))
			if userId != sessionUserId:
				return not_authorized()

			if 'leagueId' in args:
				leagueId = args["leagueId"]
				try:
					dbConnection = getDBConnection()
					sql = 'getLeagueMember'
					cursor = dbConnection.cursor()
					sqlArgs = (userId, leagueId)
					cursor.callproc(sql,sqlArgs) # stored procedure, no arguments
					row = cursor.fetchone() # get the single result
					if row is None:
						return not_authorized()
					
					role = row["role"]
					if role != "owner":
						return not_authorized()
				except:
					return abort(500) # Nondescript server error
				finally:
					cursor.close()
					dbConnection.close()


			result = f(*func, **args)
            
			return result
		return __owner_decorator
	return _owner_decorator

def member_decorator():
	def _member_decorator(f):
		@wraps(f)
		def __member_decorator(*func, **args):
			print("args: {0}".format(args))
			userId = args.get('userId')
			print("userId: {0}".format(userId))
			sessionUserId = session.get("userId", "Not Authed")
			print("userId: {0}".format(sessionUserId))
			if userId != sessionUserId:
				return not_authorized()

			if 'leagueId' in args:
				leagueId = args["leagueId"]
				try:
					dbConnection = getDBConnection()
					sql = 'getLeagueMember'
					cursor = dbConnection.cursor()
					sqlArgs = (userId, leagueId)
					cursor.callproc(sql,sqlArgs) # stored procedure, no arguments
					row = cursor.fetchone() # get the single result
					print("{0}".format(row))
					if row is None:
						return not_authorized()
					
					role = row["role"]
					if role != "owner" and role !="member":
						return not_authorized()
				except:
					return abort(500) # Nondescript server error
				finally:
					cursor.close()
					dbConnection.close()


			result = f(*func, **args)
            
			return result
		return __member_decorator
	return _member_decorator

def user_decorator():
	def _user_decorator(f):
		@wraps(f)
		def __user_decorator(*func, **args):
			print("args: {0}".format(args))
			if 'userId' in session:
				userId = session['userId']
				if 'userId' in args:
					if userId != args['userId']:
						return not_authorized()
				result = f(*func, **args)
				return result
			else:
				return not_authorized()
			
		return __user_decorator
	return _user_decorator

def auth_decorator():
	def _auth_decorator(f):
		@wraps(f)
		def __auth_decorator(*func, **args):
			print("args: {0}".format(args))
			if 'userId' in session:
				result = f(*func, **args)
				return result
			else:
				return not_authorized()
			
		return __auth_decorator
	return _auth_decorator


class Login(Resource):
	# curl -i -X POST -H "Content-Type: application/json" -c cookie-jar -k -d '{"username": "<UNB FCS Username>", "password": "<UNB FCS Password>"}' https://cs3103.cs.unb.ca:8005/login
	def post(self):
		if not request.json:
			return bad_request(None) # bad request
		
		parser = reqparse.RequestParser()
		try:
 			# Check for required attributes in json document, create a dictionary
			parser.add_argument('username', type=str, required=True)
			parser.add_argument('password', type=str, required=True)
			request_params = parser.parse_args()
		except:
			return bad_request(None)
		if request_params['username'] in session:
			return make_response(jsonify({"status": "success"}), 200)
		else:
			try:
				
				ldapServer = Server(host=settings.LDAP_HOST)
				ldapConnection = Connection(ldapServer,
					raise_exceptions=True,
					user='uid='+request_params['username']+', ou=People,ou=fcs,o=unb',
					password = request_params['password'])
				ldapConnection.open()
				ldapConnection.start_tls()
				ldapConnection.bind()

				dbConnection = getDBConnection()
				sql = 'getUser'
				cursor = dbConnection.cursor()
				email = request_params["username"] + "@unb.ca"
				sqlArgs = (email,)
				cursor.callproc(sql,sqlArgs) # stored procedure, no arguments
				row = cursor.fetchone() # get the single result
				if row is None:
					print("User not found")
					return bad_request(None)
				userId = row.get("userId")
				print("{0}".format(userId))
				session['userId'] = userId

				if row.get("isActive") is 0:
					sql = 'updateUser'
					sqlArgs = (row.get("userId"), row.get("firstName"), row.get("lastName"), row.get("profileImageUrl"), 1,)
					cursor.callproc(sql,sqlArgs)
					row = cursor.fetchone()
					dbConnection.commit() # database was modified, commit the changes

				return make_response(jsonify({"user": row}), 200) # successful
			except:
				return bad_request(None)
			finally:
				ldapConnection.unbind()

class Users(Resource):
	def post(self):
		# Curl Example:  curl -i -X POST -H "Content-Type: application/json" -k -d '{"email": "<Insert Email>", "firstName": "<Insert First Name>", "lastName": "<Insert Last Name>", "isActive": true}' https://cs3103.cs.unb.ca:8005/users
		if not request.json:
			return bad_request(None) # bad request
		if not 'email' in request.json or not 'firstName' in request.json or not 'lastName' in request.json or not 'isActive' in request.json:
			return bad_request(None) # bad request

			# The request object holds the ... wait for it ... client request!
		# Pull the results out of the json request
		email = request.json['email']
		firstName = request.json['firstName']
		lastName = request.json['lastName']
		isActive = request.json['isActive']
		try:
			dbConnection = getDBConnection()
			cursor = dbConnection.cursor()
			sqlArgs = (email, firstName, lastName)
			try:
				if isActive:
					cursor.callproc('registerUser',sqlArgs) 
				else:
					cursor.callproc('createUser',sqlArgs)
				row = cursor.fetchone()
				userId = row.get("LAST_INSERT_ID()")
				dbConnection.commit() # database was modified, commit the changes
				return make_response(jsonify({"userId": userId}), 201)
			except:
				return bad_request(None)
		except:
			abort(500) # Nondescript server error
		finally:
			cursor.close()
			dbConnection.close()

class User(Resource):
	@user_decorator()
	def put(self, userId):
		# Curl Example: curl -i -X PUT -H "Content-Type: application/json" -d '{"firstName": "Emoney", "lastName": "Eddy", "profileImageUrl": "www.google.com", "isActive": false}' http://cs3103.cs.unb.ca:52617/users/4
		if not request.json:
			return bad_request(None) # bad request
		if not 'firstName' in request.json or not 'lastName' in request.json or not 'profileImageUrl' in request.json or not 'isActive' in request.json:
			return bad_request(None) # bad request

		# The request object holds the ... wait for it ... client request!
		# Pull the results out of the json request
		firstName = request.json['firstName']
		lastName = request.json['lastName']
		isActive = request.json['isActive']
		profileImageUrl = request.json['profileImageUrl']

		try:
			dbConnection = getDBConnection()
			sql = 'updateUser'
			cursor = dbConnection.cursor()
			sqlArgs = (userId, firstName, lastName, profileImageUrl, isActive)
			cursor.callproc(sql,sqlArgs)
			row = cursor.fetchone()
			dbConnection.commit() # database was modified, commit the changes
		except:
			abort(500) # Nondescript server error
		finally:
			cursor.close()
			dbConnection.close()
		return make_response(jsonify({"status": "successfully updated resource"}), 204) # successful
	
	@auth_decorator()
	def get(self, userId):
		# Curl Example: curl http://cs3103.cs.unb.ca:52617/users/2
		try:
			dbConnection = getDBConnection()
			sql = 'getUserById'
			cursor = dbConnection.cursor()
			sqlArgs = (userId,)
			cursor.callproc(sql,sqlArgs) # stored procedure, no arguments
			row = cursor.fetchone() # get the single result
			if row is None:
				return not_found(None)
		except:
			abort(500) # Nondescript server error
		finally:
			cursor.close()
			dbConnection.close()
		return make_response(jsonify({"user": row}), 200) # successful
	

class LeagueMembers(Resource):
	@member_decorator()
	def get(self, userId, leagueId):
		# Curl Example: curl http://cs3103.cs.unb.ca:52617/users/2/leagues/3/members
		try:
			dbConnection = getDBConnection()
			sql = 'getLeagueMembers'
			cursor = dbConnection.cursor()
			sqlArgs = (leagueId,)
			cursor.callproc(sql,sqlArgs) # stored procedure, no arguments
			rows = cursor.fetchall() # get the single result
		except:
			abort(500) # Nondescript server error
		finally:
			cursor.close()
			dbConnection.close()
		return make_response(jsonify({"members": rows}), 200) # successful

	@owner_decorator()
	def post(self, userId, leagueId):
		# Curl Example:  curl -i -X POST -H "Content-Type: application/json" -d '{"userId": 6, "role": "Participant"}' http://cs3103.cs.unb.ca:52617/users/2/leagues/3/members
		if not request.json:
			return bad_request(None) # bad request
		if not 'userId' in request.json or not 'role' in request.json:
			return bad_request(None) # bad request

			# The request object holds the ... wait for it ... client request!
		# Pull the results out of the json request
		userIdIn = request.json['userId']
		role = request.json['role']

		try:
			dbConnection = getDBConnection()
			cursor = dbConnection.cursor()
			sqlArgs = (userIdIn, leagueId, role)
			try:
				cursor.callproc('createLeagueMember',sqlArgs) 
				row = cursor.fetchone()
				dbConnection.commit() # database was modified, commit the changes
				return make_response(jsonify({}), 201)
			except:
				return bad_request(None)
		except:
			abort(500) # Nondescript server error
		finally:
			cursor.close()
			dbConnection.close()

class LeaguesForUser(Resource):
	@user_decorator()
	def get(self, userId):
		# Curl Example: curl -c cookie-jar http://cs3103.cs.unb.ca:8005/users/1/leagues
		try:
			dbConnection = getDBConnection()
			sql = 'getLeaguesForUser'
			cursor = dbConnection.cursor()
			sqlArgs = (userId,)
			cursor.callproc(sql,sqlArgs) # stored procedure, no arguments
			rows = cursor.fetchall() # get the single result
		except:
			abort(500) # Nondescript server error
		finally:
			cursor.close()
			dbConnection.close()
		return make_response(jsonify({"leagues": rows}), 200) # successful

	@user_decorator()
	def post(self, userId):
		# Curl Example:  curl -i -k -X POST -H "Content-Type: application/json" -b cookie-jar -d '{"leagueName": "Test League", "leagueFormatId": 2}' https://cs3103.cs.unb.ca:8005/users/<Insert Your Id>/leagues
		if not request.json:
			return bad_request(None) # bad request
		if not 'leagueName' in request.json or not 'leagueFormatId' in request.json:
			return bad_request(None) # bad request

			# The request object holds the ... wait for it ... client request!
		# Pull the results out of the json request
		leagueName = request.json['leagueName']
		leagueFormatId = request.json['leagueFormatId']

		try:
			dbConnection = getDBConnection()
			cursor = dbConnection.cursor()
			sqlArgs = (leagueName, leagueFormatId)
			try:
				cursor.callproc('createLeague',sqlArgs) 
				row = cursor.fetchone()
				dbConnection.commit() # database was modified, commit the changes
				leagueId = row.get('LAST_INSERT_ID()')
				sqlArgs = (userId, leagueId, "owner")
				cursor.callproc('createLeagueMember',sqlArgs) 
				row = cursor.fetchone()
				dbConnection.commit() # database was modified, commit the changes
				return make_response(jsonify({ "leagueId": leagueId }), 201)
			except:
				return bad_request(None)
		except:
			abort(500) # Nondescript server error
		finally:
			cursor.close()
			dbConnection.close()

class MatchesForUser(Resource):
	@user_decorator()
	def get(self, userId):
		# Curl Example: curl -c cookie-jar http://cs3103.cs.unb.ca:8005/users/1/matches
		try:
			dbConnection = getDBConnection()
			sql = 'getLeaguesForUser'
			cursor = dbConnection.cursor()
			sqlArgs = (userId,)
			cursor.callproc(sql,sqlArgs) # stored procedure, no arguments
			rows = cursor.fetchall() # get the single result
		except:
			abort(500) # Nondescript server error
		finally:
			cursor.close()
			dbConnection.close()
		return make_response(jsonify({"leagues": rows}), 200) # successful

class LeagueMemberById(Resource):
	@member_decorator()
	def get(self, userId, leagueId, memberId):
		# Curl Example: curl http://cs3103.cs.unb.ca:52617/users/1/leagues/3/members/1
		try:
			dbConnection = getDBConnection()
			sql = 'getLeagueMember'
			cursor = dbConnection.cursor()
			sqlArgs = (leagueId, memberId)
			cursor.callproc(sql,sqlArgs) # stored procedure, no arguments
			row = cursor.fetchone() # get the single result
			if row is None:
				return not_found(None)
		except:
			abort(500) # Nondescript server error
		finally:
			cursor.close()
			dbConnection.close()
		return make_response(jsonify({"member": row}), 200) # successful

	@owner_decorator()
	def delete(self, userId, leagueId, memberId):
		# Curl Example: curl -X DELETE http://cs3103.cs.unb.ca:52617/users/1/leagues/3/members/4
		try:
			dbConnection = getDBConnection()
			sql = 'deleteLeagueMember'
			cursor = dbConnection.cursor()
			sqlArgs = (memberId, leagueId)
			try:
				cursor.callproc(sql,sqlArgs) # stored procedure, no arguments
				row = cursor.fetchone() # get the single result
				dbConnection.commit()
			except:
				return bad_request(None)
		except:
			abort(500) # Nondescript server error
		finally:
			cursor.close()
			dbConnection.close()
		return make_response(jsonify({}), 204) # successful

class Leagues(Resource):
	@member_decorator()
	def get(self, userId, leagueId):
		# Curl Example: curl http://cs3103.cs.unb.ca:52617/users/1/leagues/4
		try:
			dbConnection = getDBConnection()
			sql = 'getLeague'
			cursor = dbConnection.cursor()
			sqlArgs = (leagueId,)
			cursor.callproc(sql,sqlArgs) # stored procedure, no arguments
			row = cursor.fetchone() # get the single result
			if row is None:
				return not_found(None)
		except:
			abort(500) # Nondescript server error
		finally:
			cursor.close()
			dbConnection.close()
		return make_response(jsonify({"league": row}), 200) # successful

	@owner_decorator()
	def delete(self, userId, leagueId):
		# Curl Example: curl -X DELETE http://cs3103.cs.unb.ca:52617/users/1/leagues/6
		try:
			dbConnection = getDBConnection()
			sql = 'deleteLeague'
			cursor = dbConnection.cursor()
			sqlArgs = (leagueId,)
			try:
				cursor.callproc(sql,sqlArgs) # stored procedure, no arguments
				row = cursor.fetchone() # get the single result
				dbConnection.commit()
			except:
				return bad_request(None)
		except:
			abort(500) # Nondescript server error
		finally:
			cursor.close()
			dbConnection.close()
		return make_response(jsonify({}), 204) # successful

	@owner_decorator()
	def put(self, userId, leagueId):
		# Curl Example: curl -i -X PUT -H "Content-Type: application/json" -d '{"leagueName": "Test League New Name", "leagueFormatId": 1}' http://cs3103.cs.unb.ca:52617/users/4/leagues/5
		if not request.json:
			return bad_request(None) # bad request
		if not 'leagueName' in request.json or not 'leagueFormatId' in request.json:
			return bad_request(None) # bad request

		name = request.json['leagueName']
		leagueFormatId = request.json['leagueFormatId']

		try:
			dbConnection = getDBConnection()
			sql = 'updateLeague'
			cursor = dbConnection.cursor()
			sqlArgs = (leagueId, name, leagueFormatId)
			cursor.callproc(sql,sqlArgs)
			row = cursor.fetchone()
			dbConnection.commit() # database was modified, commit the changes
		except:
			abort(500) # Nondescript server error
		finally:
			cursor.close()
			dbConnection.close()
		return make_response(jsonify({"status": "successfully updated resource"}), 204) # successful

class Matches(Resource):
	@member_decorator() 
	def post(self, userId, leagueId):
		# Curl Example:  curl -i -X POST -b cookie-jar http://cs3103.cs.unb.ca:8005/users/16/leagues/11/matches
		try:
			dbConnection = getDBConnection()
			cursor = dbConnection.cursor()
			sqlArgs = (leagueId,)
			try:
				cursor.callproc('createMatch',sqlArgs) 
				row = cursor.fetchone()
				matchId = row.get('LAST_INSERT_ID()', 'None')
				dbConnection.commit() # database was modified, commit the changes
				return make_response(jsonify({ "matchId": matchId}), 201)
			except:
				return bad_request(None)
		except:
			abort(500) # Nondescript server error
		finally:
			cursor.close()
			dbConnection.close()

	@member_decorator()
	def get(self, userId, leagueId):
		# Curl Example: curl http://cs3103.cs.unb.ca:52617/users/1/leagues/4/matches
		try:
			dbConnection = getDBConnection()
			sql = 'getMatchesForLeague'
			cursor = dbConnection.cursor()
			sqlArgs = (leagueId,)
			cursor.callproc(sql,sqlArgs) # stored procedure, no arguments
			rows = cursor.fetchall() # get the single result
			allrows = []
			for row in rows:
				sqlArgs2 = (row['matchId'],)
				cursor.callproc('getResultsForMatch', sqlArgs2)
				rows2 = cursor.fetchall()
				row["results"] = rows2
				allrows.append(row)
		except:
			abort(500) # Nondescript server error
		finally:
			cursor.close()
			dbConnection.close()
		return make_response(jsonify({"matches": allrows}), 200) # successful

class Match(Resource): 
	@member_decorator()
	def get(self, userId, leagueId, matchId):
		# Curl Example: curl http://cs3103.cs.unb.ca:52617/users/1/leagues/4/matches/2
		try:
			dbConnection = getDBConnection()
			sql = 'getMatchById'
			cursor = dbConnection.cursor()
			sqlArgs = (matchId,)
			cursor.callproc(sql,sqlArgs) # stored procedure, no arguments
			row = cursor.fetchone() # get the single result
			if row is None:
				return not_found(None)
			sqlArgs2 = (matchId,)
			cursor.callproc('getResultsForMatch', sqlArgs2)
			rows2 = cursor.fetchall()
			row["results"] = rows2
		except:
			abort(500) # Nondescript server error
		finally:
			cursor.close()
			dbConnection.close()
		return make_response(jsonify({"match": row}), 200) # successful

	@owner_decorator()
	def delete(self, userId, leagueId, matchId):
		# Curl Example: curl -X DELETE http://cs3103.cs.unb.ca:52617/users/1/leagues/6/matches/2
		try:
			dbConnection = getDBConnection()
			sql = 'deleteMatch'
			cursor = dbConnection.cursor()
			sqlArgs = (matchId,)
			try:
				cursor.callproc(sql,sqlArgs) # stored procedure, no arguments
				row = cursor.fetchone() # get the single result
				dbConnection.commit()
			except:
				return bad_request(None)
		except:
			abort(500) # Nondescript server error
		finally:
			cursor.close()
			dbConnection.close()
		return make_response(jsonify({}), 204) # successful

class Results(Resource):
	@member_decorator()
	def post(self, userId, leagueId, matchId):
		# Curl Example:  curl -i -X POST -H "Content-Type: application/json" -b cookie-jar -d '{"points": 100, "userId": 1}' http://cs3103.cs.unb.ca:8005/users/16/leagues/11/matches/13/results
		if not request.json:
			return bad_request(None) # bad request
		if not 'points' in request.json or not 'userId' in request.json:
			return bad_request(None) # bad request

		points = request.json['points']
		userIdIn = request.json['userId']

		try:
			dbConnection = getDBConnection()
			cursor = dbConnection.cursor()
			sqlArgs = (matchId, points, userIdIn)
			try:
				cursor.callproc('createResult',sqlArgs) 
				row = cursor.fetchone()
				resultId = row.get("LAST_INSERT_ID()", "None")
				dbConnection.commit() # database was modified, commit the changes
				return make_response(jsonify({"resultId": resultId }), 201)
			except:
				return bad_request(None)
		except:
			abort(500) # Nondescript server error
		finally:
			cursor.close()
			dbConnection.close()
	@member_decorator()
	def get(self, userId, leagueId, matchId):
		# Curl Example: curl http://cs3103.cs.unb.ca:52617/users/1/leagues/6/matches/2/results
		try:
			dbConnection = getDBConnection()
			sql = 'getResultsForMatch'
			cursor = dbConnection.cursor()
			sqlArgs = (matchId,)
			cursor.callproc(sql,sqlArgs) # stored procedure, no arguments
			rows = cursor.fetchall() # get the single result
		except:
			abort(500) # Nondescript server error
		finally:
			cursor.close()
			dbConnection.close()
		return make_response(jsonify({"match": rows}), 200) # successful

class Result(Resource):
	@owner_decorator()
	def delete(self, userId, leagueId, matchId, resultId): 
		# Curl Example: curl -X DELETE http://cs3103.cs.unb.ca:52617/users/1/leagues/6/matches/2/results/1
		try:
			dbConnection = getDBConnection()
			sql = 'deleteResult'
			cursor = dbConnection.cursor()
			sqlArgs = (resultId,)
			try:
				cursor.callproc(sql,sqlArgs) # stored procedure, no arguments
				row = cursor.fetchone() # get the single result
				dbConnection.commit()
			except:
				return bad_request(None)
		except:
			abort(500) # Nondescript server error
		finally:
			cursor.close()
			dbConnection.close()
		return make_response(jsonify({}), 204) # successful

####################################################################################
#
# Identify/create endpoints and endpoint objects
#
api = Api(app)

# User Endpoints
api.add_resource(Login, '/login')
api.add_resource(Users, '/users')
api.add_resource(User, '/users/<int:userId>')
api.add_resource(LeagueMembers, '/users/<int:userId>/leagues/<int:leagueId>/members')
api.add_resource(LeaguesForUser, '/users/<int:userId>/leagues')
api.add_resource(LeagueMemberById, '/users/<int:userId>/leagues/<int:leagueId>/members/<int:memberId>')
api.add_resource(Leagues, '/users/<int:userId>/leagues/<int:leagueId>')
api.add_resource(Matches, '/users/<int:userId>/leagues/<int:leagueId>/matches')
api.add_resource(Match, '/users/<int:userId>/leagues/<int:leagueId>/matches/<int:matchId>')
api.add_resource(Results, '/users/<int:userId>/leagues/<int:leagueId>/matches/<int:matchId>/results')
api.add_resource(Result, '/users/<int:userId>/leagues/<int:leagueId>/matches/<int:matchId>/results/<int:resultId>')

#############################################################################
# xxxxx= last 5 digits of your studentid. If xxxxx > 65535, subtract 30000
if __name__ == "__main__":
	context = ('cert.pem', 'key.pem')
	app.run(host=settings.APP_HOST, port=settings.APP_PORT, ssl_context=context, debug=settings.APP_DEBUG)