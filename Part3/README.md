# Part 1 answers
</br>

## <b>Made by Teemu Koivumaa<b>
### By clicking the exercise title, it takes you to the point in the repository where you can check the committed files for that exercise.

</br>

# Exe 3.06 DBaaS vs DIY

## DBaaS

### Pros
- Easy to setup and work with
- Effort to maintain it is minimal
- Customer support that can and will help with your problems and questions
- Reliablity
    - Is maintained and developed by group of specialists
    - Standards of the data centers are higher, so that usually leads to less downtime and errors in the servers.
    - Easy to setup backup schedule and backup storage
- Usually more cheap than making your own custom solution
    - Don't need to hire people to maintain it
    - Don't need your own machines to run it & pay for the electricity costs
    - Don't need to buy the software licenses (if you need to use a paid software solution)
### Cons
- You only control the data and the aplication
- If the databases are located far away, that might increase loading times
- Testing with sensitive data is not suitable
- Data protection and compliance guidelines depend on the location of the data center
- If the database servers go down, you can't do anything to fix them and will need to wait.

## DIY

### Pros
- You can specify your needs and make a solution that supports them
- Control the machines and maybe even run some other software on them
- Control of the database design and planning, configuration, integration, staffing, and maintenance

### Cons
- You need to upgrade and maintain the services and machines -> Complexity
- Cost of development time. Developers are busy making and maintaining the machines instead of developing the software that you will sell.
- As your organization grows, so will the cost and complexity of your database and its integration to other parts of the organization
- Can have unexpected costs


# Exercise 3.07: Commitment
I chose to use the Postgres with PersistentVolumeClaim approach instead of using Google Cloud SQL.

I just tought that using Postgres and making the PVC is more fun. Also having just spend a lot of time debugging why the PVC & PV where I store the daily pictures wasn't working, I was really familiar on how to make them work in GKE. Altough it would kind of make more sense to learn a bit about GCSQL to familiarise myself a bit more on using DBaaS myself. Also I could have skipped all of this debugging by just using the GCSQL.


