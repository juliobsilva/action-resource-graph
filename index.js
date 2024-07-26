const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    const resourceName = core.getInput('resource_name');
    const resourceType = core.getInput('resource_type');

    core.info(`Resource Name: ${resourceName}`);
    core.info(`Resource Type: ${resourceType}`);

    const query = `Resources | where type =~ '${resourceType}' and name =~ '${resourceName}' | project id, name, type, subscriptionId`;
    let result = '';

    const options = {};
    options.listeners = {
      stdout: (data) => {
        result += data.toString();
      },
    };

    await exec.exec('az', ['extension', 'add', '--name', 'resource-graph', '--only-show-errors'], options);

    await exec.exec('az', ['graph', 'query', '-q', query, '-o', 'json'], options);   
    

    const queryResult = JSON.parse(result);

    if (queryResult.data.length > 0) {
      const resource = queryResult.data[0];
      core.setOutput('id', resource.id);
      core.setOutput('name', resource.name);
      core.setOutput('type', resource.type);
      core.setOutput('subscription_id', resource.subscriptionId);

      core.info(`Resource ID: ${resource.id}`);
      core.info(`Resource Name: ${resource.name}`);
      core.info(`Resource Type: ${resource.type}`);
      core.info(`Subscription ID: ${resource.subscriptionId}`);
    } else {
      core.setFailed(`No resources found for type: ${resourceType} and name: ${resourceName}`);
      // Additional action or logging for resource not found scenario
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();