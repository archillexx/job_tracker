
from scoring import fit_score

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


