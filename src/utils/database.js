import Dexie from "dexie";

export async function initCommitToDB(database, data) {
  Dexie.delete(database);
  const db = new Dexie(database);
  db.version(1).stores({
    projects: "++id, metadata, rawContent",
  });
  try {
    // @ts-ignore
    await db.projects.bulkAdd(data);
  } catch (error) {
    console.log(error);
  }
}

export async function getAllTagsFromProjectsDB() {
  let tags = [];

  const db = new Dexie("projects");
  db.version(1).stores({
    projects: "++id, metadata, rawContent",
  });
  try {
    // @ts-ignore
    await db.projects.each((project) => {
      project.metadata.tags.forEach((tag) => {
        if (!tags.includes(tag)) tags.push(tag);
      });
    });
    return tags;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProjectsEssentialsFromProjectsDB() {
  // each project essential is the id of the porject in db and the metadata
  let projectsEssentials = [];

  const db = new Dexie("projects");
  db.version(1).stores({
    projects: "++id, metadata, rawContent",
  });
  try {
    // @ts-ignore
    await db.projects.each((project) => {
        projectsEssentials.push({
            id: project.id,
            metadata: project.metadata,
        });
    });
    return projectsEssentials;
  } catch (error) {
    console.log(error);
  }
}

export async function getProjectFromID(id) {
  const db = new Dexie("projects");
  db.version(2).stores({
    projects: "++id, metadata, rawContent, parsedContent",
  });
  try {
    // @ts-ignore
    return await db.projects.get(id);
  } catch (error) {
    console.log(error);
  }
}

export async function addParsedContentFromID(id, parsedContent){
  const db = new Dexie("projects");
  db.version(2).stores({
    projects: "++id, metadata, rawContent, parsedContent",
  });
  try {
    // @ts-ignore
    const proj = await db.projects.get(id);
    proj.parsedContent = parsedContent;
    // @ts-ignore
    await db.projects.put(proj);
  } catch (error) {
    console.log(error);
  }
}

export async function updateParsedWithCustomizedHTML(id, htmlContent){
  const db = new Dexie("projects");
  db.version(2).stores({
    projects: "++id, metadata, rawContent, parsedContent",
  });
  try {
    // @ts-ignore
    const proj = await db.projects.get(id);
    proj.parsedContent = htmlContent;
    // @ts-ignore
    await db.projects.put(proj);
  } catch (error) {
    console.log(error);
  }
}
