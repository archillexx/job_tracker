
def fit_score(j_skills,r_skills):
        job_skills = set(j_skills)
        resume_skills = set(r_skills)
        missing_skills = sorted(job_skills - resume_skills)
        missing_skills_count = len(missing_skills)

        score = ((len(job_skills)-missing_skills_count)/len(job_skills))*100

        return score,missing_skills


if __name__ == "__main__":
    jobSkills=["react","python","java"]
    resumeSkills = ["react","python","c++","c"]
    
    percentage, missingSkill = fit_score(jobSkills,resumeSkills)

    print(f"Percentage={percentage}% Missing Skill is {missingSkill} ")


    
