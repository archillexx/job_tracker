
from scoring import fit_score
from scoring import most_missed_skills

def test_normal_overlap():
    jobSkills = ["react","java"]
    resumeSkills = ["angular","java"]
    assert fit_score(jobSkills,resumeSkills) == (50,["react"])

def test_perfect():
    jobSkills = ["react","java","c++"]
    resumeSkills = ["angular","java","react","c++"]
    assert fit_score(jobSkills,resumeSkills) == (100,[])

def test_nomatch():
    jobSkills = ["react","java","c++"]
    resumeSkills = ["rust","typescript","c"]
    assert fit_score(jobSkills,resumeSkills) == (0,["c++","java","react"])


def test_no_job_skills():
    jobSkills = []
    resumeSkills = ["rust","typescript","c"]
    assert fit_score(jobSkills,resumeSkills) == (None,[])

def test_capitalization():
    jobSkills = ["react","java","C++"]
    resumeSkills = ["angular","Java","React","c++"]
    assert fit_score(jobSkills,resumeSkills) == (100,[])

def test_duplicates():
    jobSkills = ["react","react","java","c++","typescript"]
    resumeSkills = ["react","typescript","c","c"]
    assert fit_score(jobSkills,resumeSkills) == (50,["c++","java"])



def test_normal_gap():
    jobs = [["react","java","C++"],["react","java","C","python","c++"],["react","java","C","python","c++","aws"]]
    my_skills = ["react","java","C","python"]
    assert most_missed_skills(jobs,my_skills) == [('c++', 3), ('aws', 1)]

def test_empty_jobs():
    jobs = []
    my_skills = ["react","java","C","python"]
    assert most_missed_skills(jobs,my_skills) == []

def test_no_gap():
    jobs = [["react","java","C++"],["react","java","C","python","c++"],["react","java","C","python","c++","aws"]]
    my_skills = ["react","java","C","python","c++","aws"]
    assert most_missed_skills(jobs,my_skills) == []

def test_duplicate_gap():
    jobs = [["react","java","C++","c++"],["react","java","C","python","c++"],["react","java","C","python","c++","aws"]]
    my_skills = ["react","java","C","python"]
    assert most_missed_skills(jobs,my_skills) == [('c++', 3), ('aws', 1)]
