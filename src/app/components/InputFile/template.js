import styles from "./styles";

const template = /* html */`
  ${styles}
  <div class="preview">
    <p>Upload image<p>
    <span>=> <span class="preview-label">Ex: image.png</span></span>
  </div>
  <button type="button">Upload</button>
  <input type="file" name="" id="" placeholder="Upload image" />
`;

export default template;
