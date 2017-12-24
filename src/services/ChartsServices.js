import Api from '@/services/Api'

export default {
  getHostsList: () => Api().get('getHosts'),
  getVMsList: () => Api().get('getVMS'),

  getHostConf: (hostId) => Api().get(`get/config/host/${hostId}`),
  getVMConf: (vmId) => Api().get(`get/config/vm/${vmId}`),

  getHostData: (hostId, start, stop) => Api().get(`get/time/host/${(start).toJSON()}/${(stop).toJSON()}/${hostId}`),
  getVMData: (vmId, start, stop) => Api().get(`get/time/vm/${(start).toJSON()}/${(stop).toJSON()}/${vmId}`),

  getBladeData: (start, stop) => Api().get(`get/all/vm/${(start).toJSON()}/${(stop).toJSON()}/blade`),
  getBladeDataAverage: (start, stop) => Api().get(`get/all/vm/${(start).toJSON()}/${(stop).toJSON()}/bladeAverage`),

  postMultiple: (vms, start, stop) => Api().post('get/multiple', {
    vms: vms,
    start: (start).toJSON(),
    stop: (stop).toJSON()
  })
}
