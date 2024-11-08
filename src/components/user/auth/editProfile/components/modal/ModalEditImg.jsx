/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Avatar } from "@mui/material";
import uploadFile from "../../../../../../utils/uploadFile";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  borderRadius: "15px",
  p: 4,
};

export default function ModalEditImg({
  isOpen,
  setIsOpen,
  urlImg,
  setUrlImg,
  setFormValues,
  handleSave,
}) {
  const [valueUrl, setValueUrl] = React.useState("");
  const handleClose = () => {
    setValueUrl("");
    setUrlImg("");
    setIsOpen(false);
    setFormValues({});
  };

  const handleGetImg = async (e) => {
    const file = e.target.files[0];
    setValueUrl(e.target.value);
    setFormValues((prev) => ({
      ...prev,
      photoUrl: file,
    }));
  };

  const handleUpImg = () => {
    handleSave();
  };
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: "flex", gap: "10px", alignItems: "start" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <Avatar
                src={urlImg}
                sx={{
                  width: "130px",
                  height: "130px",
                }}
              />

              <Button
                variant="text"
                sx={{
                  textTransform: "capitalize",
                  fontWeight: "bold",
                }}
              >
                Xóa
              </Button>
            </Box>
            <Box>
              <h3>Chọn một ảnh để cập nhật</h3>
              <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <label
                  htmlFor="raised-button-file"
                  style={{ cursor: "pointer" }}
                >
                  <input
                    accept="image/*"
                    id="raised-button-file"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleGetImg}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      border: "1px solid grey",
                      "&:hover": {
                        bgcolor: "whitesmoke",
                        color: "black",
                      },
                    }}
                  >
                    <span>Chọn file</span>
                  </Box>
                </label>
              </Box>
              <span
                style={{
                  display: "inline-block",
                  width: "300px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  marginTop: "10px",
                }}
              >
                {valueUrl}
              </span>

              <Button onClick={handleUpImg}>Save</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
