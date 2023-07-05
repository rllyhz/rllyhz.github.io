import CheckText from "../CheckText";
import InputFile from "../InputFile";
import styles from "./styles";

const template = /* html */`
  ${styles}

  <${InputFile.tagName}
    label="Upload projects json file"
    preview-label="projects.json"
    preview-label-uploaded-color="green"
    name="projects-file"
    accept-files=".json">
  </${InputFile.tagName}>

  <${CheckText.tagName}
    label="Replacing existing projects"
    name="projects-file">
  </${CheckText.tagName}>
`;

export default template;
