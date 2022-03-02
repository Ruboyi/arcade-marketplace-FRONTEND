import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  Alert,
  AlertTitle,
  Badge,
  CircularProgress,
  IconButton,
  Modal,
  Paper,
  Rating,
  Stack,
} from "@mui/material";
import "./productPage.css";
import { useAuthorization } from "../../hooks/useAuthorization";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";
import { useNavigate } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import GoBack from "../../components/GoBack/GoBack";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SellerContact from "../../components/SellerContact/SellerContact";
import { Box } from "@mui/system";
import moment from "moment";
import "moment/locale/es";
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import ReportButton from "../../components/ReportButton/ReportButton";
import BadgeAvatars from "../../components/Avatar/Avatar";

const { REACT_APP_BACKEND_API } = process.env;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ProductPage() {
  const [productInfo, setProductInfo] = useState({});
  const [sellerInfo, setSellerInfo] = useState({});
  const [arrayImages, setArrayImages] = useState();
  const [error, setError] = useState();
  const [isCreated, setIsCreated] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [isReservado, setIsReservado] = useState(false);
  const { idProduct } = useParams();
  const { userProfile, userSession } = useAuthorization();
  const handleClose = () => setError(false);
  const handleCloseIsCreated = () => setIsCreated(false);
  const handleCloseisReported = () => setIsCreated(false);
  const navigate = useNavigate();
  const [avgRating, setAvgRating] = useState();

  //TODO urls para botones
  //const urlContacto = "";
  //const urlDenuncia = "";
  //const urlPerfil = "";

  useEffect(() => {
    async function getProductInfo() {
      await axios.put(
        `${REACT_APP_BACKEND_API}products/times-visited/${idProduct}`
      );

      const responseData = await axios.get(
        `${REACT_APP_BACKEND_API}products/${idProduct}`
      );
      const productData = responseData.data.data;
      if (productData.status) {
        setIsReservado(true);
      }
      setProductInfo(productData);

      const productImages = productData.imagesURL.map((img) => {
        return {
          url: img,
        };
      });
      setArrayImages(productImages);

      const responseSeller = await axios.get(
        `${REACT_APP_BACKEND_API}users/user/${productData.idUser}`
      );
      setSellerInfo(responseSeller.data);

      const responseAvgRating = await axios.get(
        `${REACT_APP_BACKEND_API}reviews/rating/${productData.idUser}`
      );
      if (responseAvgRating.data.data[0].avgRating > 0) {
        setAvgRating(responseAvgRating.data.data[0].avgRating);
      } else {
        setAvgRating(null);
      }
    }

    getProductInfo();
  }, [idProduct]);
  console.log(sellerInfo);

  return (
    <div className="productPageDiv">
      <GoBack />

      <Paper className="productPage-container">
        {productInfo && arrayImages ? (
          <div>
            <div className="slider">
              <SimpleImageSlider
                width={325}
                height={325}
                images={arrayImages}
                showBullets={true}
                showNavs={true}
              />
            </div>
            <div className="favorites-views">
              {userProfile.idUser !== productInfo.idUser && (
                <div>
                  {userSession && <FavoriteButton idProduct={idProduct} />}
                </div>
              )}
              <div className="favorites-views visibility">
                <IconButton>
                  <Badge badgeContent={productInfo.timesVisited}>
                    <VisibilityOutlinedIcon fontSize="large" />
                  </Badge>
                </IconButton>
                <p className="moment-product">
                  subido {moment(productInfo.createdAt).fromNow()}
                </p>
              </div>
              {userProfile.idUser !== productInfo.idUser && (
                <ReportButton
                  idProduct={productInfo.idProduct}
                  setError={setError}
                  setIsReported={setIsReported}
                />
              )}
            </div>
            <div>
              <div className="cabeceraProduct">
                <div className="price">
                  <h1>{productInfo.price}€</h1>
                  <p>{productInfo.state}</p>
                </div>
                <h2>{productInfo.title}</h2>
              </div>
              <p className="descripcionProduct">{productInfo.description}</p>
              <p className="localizacionProduct">
                Ubicación: {productInfo.location}
              </p>
              <GoogleMap location={productInfo.location} />
            </div>
            {userProfile.idUser !== productInfo.idUser && !isNaN(avgRating) && (
              <Paper elevation={3} className="user-card">
                <BadgeAvatars
                  src={sellerInfo.image}
                  isOnline={sellerInfo.isOnline}
                />
                {sellerInfo.lastLogin && !sellerInfo.isOnline && (
                  <p className="moment-product">
                    {" "}
                    últ.vez {moment(sellerInfo.lastLogin).fromNow()}{" "}
                  </p>
                )}
                <div
                  className="name-rating"
                  onClick={() =>
                    navigate(
                      `/user/${sellerInfo.nameUser}/${productInfo.idUser}`
                    )
                  }
                >
                  <h2>{sellerInfo.nameUser} </h2>
                  <Rating name="read-only" value={avgRating} readOnly />
                </div>
                <div className="buttons-user-card">
                  {userSession && (
                    <SellerContact
                      idProduct={idProduct}
                      setIsCreated={setIsCreated}
                      setError={setError}
                      className="button-contacta"
                    />
                  )}
                </div>
              </Paper>
            )}
            {userProfile.idUser !== productInfo.idUser && isNaN(avgRating) && (
              <Paper elevation={1} className="user-card">
                <img
                  src={sellerInfo.image}
                  alt="foto de perfil"
                  className="profileImage"
                />
                <div
                  className="name-rating"
                  onClick={() =>
                    navigate(
                      `/user/${sellerInfo.nameUser}/${productInfo.idUser}`
                    )
                  }
                >
                  <h2>{sellerInfo.nameUser} </h2>
                  <h3>No hay valoraciones</h3>
                </div>
                <div className="buttons-user-card">
                  {userSession && !isReservado && (
                    <SellerContact
                      idProduct={idProduct}
                      setIsCreated={setIsCreated}
                      setError={setError}
                      className="button-contacta"
                    />
                  )}
                </div>
              </Paper>
            )}
            {userProfile.idUser === productInfo.idUser && (
              <Link to={`/update-product/${idProduct}`}>Editar</Link>
            )}
            {error && (
              <div>
                <Modal
                  open={true}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box style={style}>
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="error">
                        <AlertTitle>¡Lo sentimos!</AlertTitle>
                        {error}
                      </Alert>
                    </Stack>
                  </Box>
                </Modal>
              </div>
            )}
            {isCreated && (
              <div>
                <Modal
                  open={true}
                  onClose={handleCloseIsCreated}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box style={style}>
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="success">
                        <AlertTitle>¡Todo ha ido bien!</AlertTitle>
                        Orden de comprar creada correctamente, espere respuesta
                        del vendedor
                        <strong>;)</strong>
                      </Alert>
                    </Stack>
                  </Box>
                </Modal>
              </div>
            )}
            {isReported && (
              <div>
                <Modal
                  open={true}
                  onClose={handleCloseisReported}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box style={style}>
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="success">
                        <AlertTitle>¡Todo ha ido bien!</AlertTitle>
                        Producto reportado correctamente
                      </Alert>
                    </Stack>
                  </Box>
                </Modal>
              </div>
            )}
          </div>
        ) : (
          <CircularProgress />
        )}
      </Paper>
    </div>
  );
}

export default ProductPage;
