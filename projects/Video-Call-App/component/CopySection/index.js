import { CopyToClipboard } from "react-copy-to-clipboard";
import { Copy } from "lucide-react";

import styles from "@/component/CopySection/index.module.css";

const CopySection = (props) => {
  const { roomId } = props;

  return (
    <div className={styles.copyContainer}>
      <div className={styles.copyHeading}>Copy Room ID:</div>
      <hr />
      <div className={styles.copyDescription}>
        <span>{roomId}</span>
        <CopyToClipboard text={roomId}>
          <Copy className="ml-3 cursor-pointer" />
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default CopySection;