


const JobCard = ({jobName,jobRole,jobStatus})=>{

    return(
        <div>
            <h3>{jobName}</h3>
            <h5>{jobRole}</h5>
            <h6>{jobStatus}</h6>
        </div>
    )
}
const JobList = ()=>{
    return(
        <div>
            <JobCard 
        jobName="Cognizant"
        jobRole="Software Dev"
        jobStatus="Applied"
        ></JobCard>
        <JobCard 
        jobName="Apple"
        jobRole="Software Dev"
        jobStatus="Applied"
        ></JobCard>
        <JobCard 
        jobName="Google"
        jobRole="Software Dev"
        jobStatus="Applied"
        ></JobCard>

        </div>
        
    )
}

const App = ()=>{
    return(
        <div>
            <h1> Job Tracker </h1>
            <JobList></JobList>
        </div>
        
    )
}

export default App
