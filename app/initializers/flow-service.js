export function initialize(container, application) {
  application.inject('component', 'flowService', 'service:flow');
  application.inject('service', 'flowService', 'service:flow');
}

export default {
  name: 'flow-service',
  initialize: initialize
};
