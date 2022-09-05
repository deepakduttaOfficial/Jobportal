import {
  Box,
  IconButton,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import EditIcon from "@mui/icons-material/Edit";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { isAuthenticate } from "../../../auth/helper/auth";
import { ProfileStack } from "../../../../style/style";

const Grid1 = ({ data }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = isAuthenticate();
  const dateString = data.createdAt;
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  console.log(data);
  return (
    <>
      <ProfileStack>
        <Stack
          direction={matches ? "column" : "row"}
          alignItems={matches && "center"}
        >
          <Box>
            <img
              src={
                data.secure_url ||
                `https://st4.depositphotos.com/1012074/20946/v/450/depositphotos_209469984-stock-illustration-flat-isolated-vector-illustration-icon.jpg`
              }
              alt="profilephoto"
              width={"250px"}
            />
            <Stack spacing={2} alignItems={matches && "center"}>
              {matches && (
                <Stack alignItems={matches && "center"}>
                  <Box>
                    <Typography variant="h3" component={"h1"}>
                      {user.name}
                      <IconButton
                        sx={{ color: "#e571b1", marginBottom: "30px" }}
                      >
                        <EditIcon sx={{ fontSize: 30 }} />
                      </IconButton>
                    </Typography>
                  </Box>
                  <Stack direction={"row"} sx={{ p: "5px" }}>
                    <Tooltip title="Rating" placement="top-end" arrow>
                      <Rating disabled value={2} size="small" />
                    </Tooltip>
                    <Tooltip title="rivews" placement="top-end" arrow>
                      <Typography variant="subtitle2">
                        ({data.getReviews.length} rivews)
                      </Typography>
                    </Tooltip>
                  </Stack>
                </Stack>
              )}

              <Stack direction={"row"} mt={1}>
                <OnlinePredictionIcon color="success" />
                <Typography color={"#5dc26a"} ml={2.7} variant="subtitle1">
                  I'm Online!
                </Typography>
              </Stack>

              <Stack direction={"row"}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAhvh0TjjnoGN-Yg1zCQGQsT2ubY-UF6_Knw&usqp=CAU"
                  alt="currency"
                  width={"30px"}
                />
                <Typography ml={2}>1000 {data.currency}/h</Typography>
              </Stack>

              <Stack direction={"row"}>
                <img
                  src="https://www.f-cdn.com/assets/main/en/assets/flags/in.png"
                  alt="country"
                  width={"30px"}
                />
                <Typography ml={2}>Coochbehar, {data.country}</Typography>
              </Stack>

              <Stack direction={"row"}>
                <WatchLaterIcon />
                <Typography ml={2.4}>
                  It's currently {new Date().toLocaleTimeString()}
                </Typography>
              </Stack>

              <Stack direction={"row"}>
                <PunchClockIcon />
                <Typography ml={2.4}>
                  Joined {formatDate(dateString)}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Box ml={2}>
            {!matches && (
              <Stack alignItems={matches && "center"}>
                <Box>
                  <Typography variant="h3" component={"h1"}>
                    {user.name}
                    <IconButton sx={{ color: "#e571b1", marginBottom: "30px" }}>
                      <EditIcon sx={{ fontSize: 30 }} />
                    </IconButton>
                  </Typography>
                </Box>
                <Stack direction={"row"} sx={{ p: "5px" }}>
                  <Tooltip title="Rating" placement="top-end" arrow>
                    <Rating disabled value={2} size="small" />
                  </Tooltip>
                  <Tooltip title="rivews" placement="top-end" arrow>
                    <Typography variant="subtitle2">
                      ({data.getReviews ? data.getReviews.length : "0"} rivews)
                    </Typography>
                  </Tooltip>
                </Stack>
              </Stack>
            )}

            <Box mt={3}>
              <Typography
                variant="h6"
                fontSize={"17px"}
                letterSpacing={1}
                component={"h1"}
                mt={2}
              >
                {data.describeUserSelf}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </ProfileStack>
    </>
  );
};

export default Grid1;
