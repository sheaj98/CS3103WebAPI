#!/usr/bin/env python3

from flask import Flask, jsonify, abort, request, make_response
from flask_restful import Resource, Api
import pymysql.cursors
import json

import cgitb
import cgi
import sys
cgitb.enable()

import settings # Our server and db settings, stored in settings.py

app = Flask(__name__, static_url_path='/static')
api = Api(app)


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

class Users(Resource):
	def post(self):
		# Curl Example:  curl -i -X POST -H "Content-Type: application/json" -d '{"email": "random@test.com", "firstName": "random", "lastName": "user", "isActive": true}' http://cs3103.cs.unb.ca:52617/users
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
				dbConnection.commit() # database was modified, commit the changes
			except:
				return bad_request(None)
		except:
			abort(500) # Nondescript server error
		finally:
			cursor.close()
			dbConnection.close()

class User(Resource):
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
		return make_response(jsonify({"status": "successfully updated resource"}), 200) # successful
	
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

	def post(self, userId, leagueId):
		# Curl Example:  curl -i -X POST -H "Content-Type: application/json" -d '{"userId": 6, "role": "Participant"}' http://cs3103.cs.unb.ca:52617/users/2/leagues/3/members
		if not request.json:
			return bad_request(None) # bad request
		if not 'userId' in request.json or not 'role' in request.json:
			return bad_request(None) # bad request

			# The request object holds the ... wait for it ... client request!
		# Pull the results out of the json request
		userIdIn = request.json['userId'];
		role = request.json['role'];

		try:
			dbConnection = getDBConnection()
			cursor = dbConnection.cursor()
			sqlArgs = (userIdIn, leagueId, role)
			try:
				cursor.callproc('createLeagueMember',sqlArgs) 
				row = cursor.fetchone()
				dbConnection.commit() # database was modified, commit the changes
			except:
				return bad_request(None)
		except:
			abort(500) # Nondescript server error
		finally:
			cursor.close()
			dbConnection.close()

class LeaguesForUser(Resource):
	def get(self, userId):
		# Curl Example: curl http://cs3103.cs.unb.ca:52617/users/1/leagues
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

	def post(self, userId):
		# Curl Example:  curl -i -X POST -H "Content-Type: application/json" -d '{"leagueName": "Test League", "leagueFormatId": 2}' http://cs3103.cs.unb.ca:52617/users/2/leagues
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
			except:
				return bad_request(None)
		except:
			abort(500) # Nondescript server error
		finally:
			cursor.close()
			dbConnection.close()

class LeagueMemberById(Resource):
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

	//TODO: Fix
	def delete(self, userId, leagueId, memberId):
		# Curl Example: curl -X DELETE http://cs3103.cs.unb.ca:52617/users/1/leagues/3/members/4
		try:
			dbConnection = getDBConnection()
			sql = 'deleteLeagueMember'
			cursor = dbConnection.cursor()
			sqlArgs = (memberId, leagueId)
			cursor.callproc(sql,sqlArgs) # stored procedure, no arguments
			row = cursor.fetchone() # get the single result
			if row is None:
				return not_found(None)
		except:
			abort(500) # Nondescript server error
		finally:
			cursor.close()
			dbConnection.close()
		return make_response(jsonify({}), 204) # successful

class Leagues(Resource):
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



####################################################################################
#
# Identify/create endpoints and endpoint objects
#
api = Api(app)

# User Endpoints
api.add_resource(Users, '/users')
api.add_resource(User, '/users/<int:userId>')
api.add_resource(LeagueMembers, '/users/<int:userId>/leagues/<int:leagueId>/members')
api.add_resource(LeaguesForUser, '/users/<int:userId>/leagues')
api.add_resource(LeagueMemberById, '/users/<int:userId>/leagues/<int:leagueId>/members/<int:memberId>')
api.add_resource(Leagues, '/users/<int:userId>/leagues/<int:leagueId>')

#############################################################################
# xxxxx= last 5 digits of your studentid. If xxxxx > 65535, subtract 30000
if __name__ == "__main__":
#    app.run(host="info3103.cs.unb.ca", port=xxxx, debug=True)
	app.run(host=settings.APP_HOST, port=settings.APP_PORT, debug=settings.APP_DEBUG)
