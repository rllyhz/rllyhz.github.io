import styles from "./styles";

const template = /* html */`
  ${styles}
  <div class="form-group">
    <label for="pinned-projects">Pinned Projects Order</label>
    <input id="pinned-projects" type="text" name="pinned-projects" placeholder="Ex: 2,4,3,6,9,1" />
  </div>
  <div class="form-group">
    <label for="token-expires">Token Expires in Hours</label>
    <input id="token-expires" type="number" name="token-expires" placeholder="Ex: 2 (hours)" />
  </div>
`;

export default template;
