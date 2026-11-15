# database connection
    - Choose PostgresSQL rather than Prima: 
        Reason: learn the SQL statement and learn the process to connect to database server. 
# table creation 
    - defect: expand with plan start/finish date and actual start/finish date
        Reason: due_date = plan finish date, this is required.
                plan/actual allow manager to schedule their works and foresee how the plan impact on handover. 
        Reason: plan start date is useful when manager has assgined the defect works to contractor but not yet started. 
# server creation and connect to database
# create the first route. 
    - projects route: 
        validate the project id, if it's not uuid format, return 400 bad request instead of 500. 