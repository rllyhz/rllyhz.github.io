fetch("../data/projects.json")
.then(res => res.json())
.then(projects => {
  if (projects) {
    projects.forEach(project => {
      addProject(project)
    });
  }

  console.clear()
})