'use strict';

const { request } = require("@octokit/request");
const axios = require('axios');
const md = require('markdown-it')();

module.exports = ({ strapi }) => ({

  getProjectForRepo: async (repo) => {
    const { id } = repo
    const matchingProjects = await strapi.entityService.findMany("plugin::github-projects.project", {
      filters: {
        repositoryId: id
      }
    })
    if (matchingProjects.length == 1) return matchingProjects[0].id;
    return null;
  },

  getPublicRepos: async () => {
    const rawResult = await request("GET /user/repos", {
      headers: {
        authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
      type: "public",
    });
    const result = rawResult.data.filter(item => item.id !== 307371177)

    // id, name, shortDescription, url, longDescription
    return Promise.all(
      result.map(async (item) => {
        const { id, name, description, html_url, default_branch, owner } = item
        const readmeUrl = `https://raw.githubusercontent.com/${owner.login}/${name}/${default_branch}/README.md`
        const longDescription = md.render((await axios.get(readmeUrl)).data).replaceAll("\n", "<br/>")
        // console.log("Name", name)
        // if (!longDescription || longDescription === null) {
        //   console.log(`No long desc for ${id}`)
        // }
        const repo = {
          id,
          name,
          shortDescription: description,
          url: html_url,
          longDescription,
        }

        const relatedProjectId = await strapi.plugin('github-projects').service("getReposService").getProjectForRepo(repo)
        return {
          ...repo,
          projectId: relatedProjectId,
        }
      })
    )
    // return result
  },
});
