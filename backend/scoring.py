
def to_lower_case(skills):

    lower_case_skills = []
    for skill in skills:
        lower_case_skills.append(skill.lower())
    return lower_case_skills

def fit_score(j_skills,r_skills):
        normalized_j_skills = to_lower_case(j_skills)
        normalized_r_skills = to_lower_case(r_skills) 
        job_skills = set(normalized_j_skills)
        resume_skills = set(normalized_r_skills)
        if job_skills == set():
            score = None
            missing_skills = []
        else:
            missing_skills = sorted(job_skills - resume_skills)
            missing_skills_count = len(missing_skills)

            score = ((len(job_skills)-missing_skills_count)/len(job_skills))*100

        
        return score,missing_skills


if __name__ == "__main__":
    jobSkills=["react","python","java"]
    resumeSkills = ["react","python","c++","c"]
    
    percentage, missingSkill = fit_score(jobSkills,resumeSkills)

    print(f"Percentage={percentage}% Missing Skill is {missingSkill} ")


    
