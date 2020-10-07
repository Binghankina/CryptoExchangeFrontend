export default {
  async getAssetsPasswordState () {
    return await new ApiClient("auth").get("resource/users/tx/msg")
  },
  AssetsPasswordInfo: {}
}
