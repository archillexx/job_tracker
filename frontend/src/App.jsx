import { useState } from 'react'
const JobCard = ({ companyName, jobRole, jobStatus, jobId, onStatusChange }) => {

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">{companyName}</h3>
            <h5 className="text-sm text-gray-600">{jobRole}</h5>
            <h6 className="mt-2 text-xs font-medium uppercase tracking-wide text-indigo-600">{jobStatus}</h6>
            
            <select className="mt-2 w-full rounded-md border border-gray-300 px-2 py-1 text-sm" value={jobStatus} onChange={(e)=>onStatusChange(jobId,e.target.value)}>
                <option>Applied</option>
                <option>Rejected</option>
                <option>Considering</option>
                <option>Ghosted</option>
                <option>Replied</option>
                <option>Interview</option>
            </select>
           
        </div>
    )
}

let jobs = [
    {
        jobId: 1,
        companyName: "Cognizant",
        jobRole: "Software Dev",
        jobStatus: "Applied"
    },
    {
        jobId: 2,
        companyName: "Google",
        jobRole: "Software Dev",
        jobStatus: "Applied"
    },
    {
        jobId: 3,
        companyName: "Apple",
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
            companyName: companyName,
            jobRole: jobRole,
            jobStatus: "Applied"
        }

        setJobArray([...jobArray, newJob])
        setCompanyName("")
        setJobRole("")
    }
    const changeStatus = (jobId,newStatus) => {
        setJobArray(
            jobArray.map((job)=>job.jobId === jobId ? {...job,jobStatus:newStatus} : job 
            )
        )
    }



    return (
        <div className="space-y-4">

            {jobArray.map((item) => {

                return (<JobCard key={item.jobId} companyName={item.companyName} jobRole={item.jobRole} jobStatus={item.jobStatus} jobId={item.jobId} onStatusChange={changeStatus}></JobCard>)

            })}
            <div className="rounded-lg border border-dashed border-gray-300 p-4">
                <form className="flex flex-col gap-2 sm:flex-row sm:items-end" onSubmit={addJob}>
                    <h4 className="font-semibold text-gray-900 sm:mr-2">Add Job</h4>
                    <input className="flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm" type="text" value={companyName} placeholder='Company Name' onChange={(e) => setCompanyName(e.target.value)} />
                    <input className="flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm" type="text" value={jobRole} placeholder='Job Role' onChange={(e) => setJobRole(e.target.value)} />
                    <button className="rounded-md bg-indigo-600 px-3 py-1 text-sm font-medium text-white hover:bg-indigo-700">Submit</button>
                </form>



            </div>
        </div>

    )
}

const App = () => {
    return (
        <div className="mx-auto min-h-screen max-w-2xl bg-gray-50 p-6">
            <h1 className="mb-6 text-3xl font-bold text-gray-900"> Job Tracker </h1>
            <JobList></JobList>
        </div>

    )
}

export default App
