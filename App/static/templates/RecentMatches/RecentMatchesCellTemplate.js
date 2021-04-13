const RecentMatchesCellTemplate = `
    <div class="card" style="width: 100%;">
        <div class="card-body">
            <div class="row"> 
                <div class="col text-center">
                    <p> {{user1.firstName}} {{user1.lastName}} - Points: {{user1.points}} </p>
                </div>
                <div class="col text-center">
                    <p> VS </p>
                </div>
                <div class="col text-center">
                    <p> {{user2.firstName}} {{user2.lastName}} - Points: {{user2.points}} </p>
                </div>
            </div>
            <div class="row justify-content-center text-center">
                <p> {{date}} </p>
            </div>
        </div>
    </div>
`
export {RecentMatchesCellTemplate}