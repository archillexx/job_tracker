import { useState } from 'react'
const JobCard = ({ jobName, jobRole, jobStatus }) => {

    return (
        <div>
            <h3>{jobName}</h3>
            <h5>{jobRole}</h5>
            <h6>{jobStatus}</h6>
        </div>
    )
}

let jobs = [
    {
        jobId: 1,
        jobName: "Cognizant",
        jobRole: "Software Dev",
        jobStatus: "Applied"
    },
    {
        jobId: 2,
        jobName: "Google",
        jobRole: "Software Dev",
        jobStatus: "Applied"
    },
    {
        jobId: 3,
        jobName: "Apple",
        jobRole: "Software Dev",
        jobStatus: "Applied"
    }
]



const JobList = () => {

    const [jobArray, setJobArray] = useState(jobs)
    const [companyName, setCompanyName] = useState("")
    const [jobRole, setJobRole] = useState("")



    const addJob = (e) => {
        e.preventDefault()

        const newJob = {
            jobId: jobArray.length + 1,
            jobName: companyName,
            jobRole: jobRole,
            jobStatus: "Applied"
        }

        setJobArray([...jobArray, newJob])
        setCompanyName("")
        setJobRole("")
    }


    return (
        <div>

            {jobArray.map((item) => {

                return (<JobCard key={item.jobId} jobName={item.jobName} jobRole={item.jobRole} jobStatus={item.jobStatus}></JobCard>)

            })}
            <div>
                <form onSubmit={addJob}>
                    <h4>Add Job</h4>
                    <input type="text" value={companyName} placeholder='Company Name' onChange={(e) => setCompanyName(e.target.value)} />
                    <input type="text" value={jobRole} placeholder='Job Role' onChange={(e) => setJobRole(e.target.value)} />
                    <button>Submit</button>
                </form>



            </div>
        </div>

    )
}

const App = () => {
    return (
        <div>
            <h1> Job Tracker </h1>
            <JobList></JobList>
        </div>

    )
}

export default App
