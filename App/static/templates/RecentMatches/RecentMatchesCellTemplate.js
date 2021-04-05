const RecentMatchesCellTemplate = `
    <div class="card">
        <div class="card-body">
            <div class="row"> 
                <div class="col">
                    <p> {{user1.firstName}} {{user1.lastName}} - Points: {{user1.points}} </p>
                </div>
                <div class="col">
                    <p> VS </p>
                </div>
                <div class="col">
                    <p> {{user2.firstName}} {{user2.lastName}} - Points: {{user2.points}} </p>
                </div>
            </div>
            <div class="row">
                <p> March 1st, 2021 </p>
            </div>
        </div>
    </div>
`
export {RecentMatchesCellTemplate}