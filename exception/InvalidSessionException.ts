export default class InvalidSessionException extends Error {
  constructor() {
    super("Invalid Session");
  }
}
