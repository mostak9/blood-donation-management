import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  CardActionArea,
  CardActions,
  Container,
  Grid,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";

const OurTeam = () => {
  return (
    <div>
      <Container sx={{ py: 8 }}>
        <Grid>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
            style={{ width: "70%", margin: "0 auto" }}
          >
            <SwiperSlide
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card elevation={0} sx={{ p: 5 }}>
                <CardMedia
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="data:image/jpeg;base64,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"
                    sx={{ width: 100, height: 100 }}
                  />
                </CardMedia>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    fontWeight={700}
                    component="div"
                  >
                    Sarah Johnson
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    fontWeight={500}
                    color="rgba(220, 20, 60, 1)"
                  >
                    Chief Executive Officer (CEO)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sarah leads our mission to save lives through blood
                    donations, bringing visionary leadership to our cause.
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    gap: "8px",
                  }}
                >
                  <FacebookIcon fontSize="large" cursor="pointer" />
                  <InstagramIcon fontSize="large" cursor="pointer" />
                  <LinkedInIcon fontSize="large" cursor="pointer" />
                </CardActions>
              </Card>
            </SwiperSlide>
            <SwiperSlide
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card elevation={0} sx={{ p: 5 }}>
                <CardMedia
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="data:image/jpeg;base64,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"
                    sx={{ width: 100, height: 100 }}
                  />
                </CardMedia>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    fontWeight={700}
                    component="div"
                  >
                    Sarah Johnson
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    fontWeight={500}
                    color="rgba(220, 20, 60, 1)"
                  >
                    Chief Executive Officer (CEO)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sarah leads our mission to save lives through blood
                    donations, bringing visionary leadership to our cause.
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    gap: "8px",
                  }}
                >
                  <FacebookIcon fontSize="large" cursor="pointer" />
                  <InstagramIcon fontSize="large" cursor="pointer" />
                  <LinkedInIcon fontSize="large" cursor="pointer" />
                </CardActions>
              </Card>
            </SwiperSlide>
            <SwiperSlide
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card elevation={0} sx={{ p: 5 }}>
                <CardMedia
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAtwMBIgACEQEDEQH/xAAbAAAABwEAAAAAAAAAAAAAAAAAAgMEBQYHAf/EADgQAAEDAgQEAwYFAwUBAAAAAAEAAgMEEQUSITEGQVFhEyJxFDJCgZHwByOhscFS0eEVJHLi8TP/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQMEAgX/xAAiEQACAgICAgMBAQAAAAAAAAAAAQIRAyEEEhMxMkFRQiL/2gAMAwEAAhEDEQA/ANTARgFxr2dUoBfZbLPPoKAu2Rrdl2yLHQWy7ZGyrtkrAJZCyUshZKwCWQt2Slt+yp/EHHNHh73w0DBVzM0c+9o2npf4j93Sckls6hCU3SLZZCyxbEfxAx98hIrRA3kyGNun1umUXG3ELiXDEar52U/LEuuNL9N2suWWR4Z+I+L0xDaotqAOT22J+lld8B44wvFbMl/2sx5PN237Hl810ssWcz4847LKQuWSm4uNeluaFlSyAlZcslSEWydgEIXCEey4QnYCRC4QlLIpCLEJEII9kErAplNxGb+cFvqp+hxaOUCz7rPAloZ5InXjcQVlU2jU8SZqsNQyRo1TgWI0Kzygx58RAkuQrHR41HI0HMFRTTJODRP3QuU1hrI5OacteHDQqlnAdqNbkN0UJKtDnUkrWODXFpGa9rabrljM6/EXjMsEmF4bIWjaWUH3uw7clnsc4e4MGgaEpxHU+34rPM3KGZsrcosLBJUtG+Rwt+iz5HZ6GCNIY1cEgmcLE8/KmrZZIHeVmo5kK902HZ2fmsF7bgJGr4ejlDnBoLrct1Dv+mnomQuHzMrWmObyP5OB0S7IZYJspNnN1a5vMfyoiqoanCpw9rXZb3t2Vlo5mVtCyZg1abEbZT/YrmWto7h+MsvCfFktA8UtTnfCN2XuWj+pnpzH0WnRSMnjbLC4PjeLtc3YhYe+mynNG7zM88bgPv7urzwFjYAFFMbRSm8d/gfzb6HcKuHNumZOVxlXeJeLLhCHiMHNFdMwDdbLPOOlFOybz10bBuFFVeNxR3u8XQ5JBTJpz2jchIunjG6qFbxTG24a6/oFET8USk+VhXHkO+jZontEa4szPFNQD7qCfkDxMbt2RggAjWWezUGajte9hBY8iyKNly6BErR41NC78w3HVWKgx2N41eFSdCjtFjcEg9Qu1KibgmafTVjZgMrrqF49xcYfgckUbwJagGMHoOarVJilRTuBD7gciqrxti0lTKBmJdaxudvRd97RzHG+xDtLJpcseova6s2H0wa0EhVLAznqW9zoFdaMiwA5KMjbHWiWpY2aJ9FCzomtK3ZSTG25LLI0IiMdwqOrp3eUXA0VP4ej9mxGeil9xwsB22/stHkZnjNxdZ/iDDS8QseNA4OH8/uktqjtD+Jpa0tdYuhcWn0P+f3SVJI6Cpc1ji0khzT0PIowk/38rDtIw3TEykTMcTY6gn0K5jZ0y6nimQRt8Rrs1vNbqkpeKnEaBxVddIJRccwD9UnZbIzbR5c8SUiQqcdq5iQDlaVHvlfKbyOLrorgiXsnYKKQnKUiXXCUk1SZFgmMTO6CB3QRYycaEo1pOwTxsHZLx090urObRHOYQNkmGOJ0Cm/ZtOqDaMHVOmFoh8rhyQ1CmX0WiRNCeiKYrRFPkyNc47AblUbG6gz1JDTudVcOKHCjpCwnVwuewWeVlSZGkgBoOgPNIrBfY+wKQHEmNafKAVdaYVDx+W9jByzC6pfCsWaszci1T+KRV0jmxwvLIvic0XcR2RVlETYxHEKKQNmjiczm5vJWDDsRFU0a37BUPCsKlDJJJa2UkjytcNL9+26tHCLTDPI0+dnwkqM4KmysWySxTE/ZIjlF3EaNvuqLilVWVFdBLJE2MZxz1Vk4spXvcZGvc27vMG30HZZ17NUU+IRl1RI9mbZxKWOKas6k2i4MINcy3xaX9R/cqNqZLBzgfiO/oSnr3+FPDIfdIa701UNij/DbMAdWvIt9QpxO5aJSkqA6SME7t/8AP2UkWHoqpR1WWoi65Wg/JaFHTNkhY4WILQfVXjpGTLvZBvB6JFwPRTslJYHRMKiAtGjdV2tkqI5wRLhOjET8KK2AknylPqAzcPNognppiT7tlxKmMsbXpZj0k2A9UvHTnqtdmIVY8pZjkWOn7pwyBAjg1RiNCemqWZCjTQ/kvtzFkAnszLjacze0EXyaMb9VRK1mWJvrZXPiEh2RhN7uzH5XKpuMOtkYOlz81lfyPRWok1wq17ZI5G6xltvQrRqJsUjRmAJWVcNYjLBV09IQ10ckmhO7dFpmHvslI7g9j2tja2M6Aei5gIvI5wIaOVzyRMUEkkFo91F0FNVtnfM577Ejy8h6Kf8AJS/9FrrIGzF0biDcaOCoPEVGaapaCNA8HburzRYbPB4kklS97H6hhNwCq/xdEDCHEa2UoOnRb2Q73Nnw2OQbhtj2+/4UDizszpepHifpr+oT3D60RiWB5uDZ49Dp+/7ppiYDcjwNiWn0Ov36pxVMUnaI+m8SasiEQJeQSG9bC61bhqdlZhceU+ZoA+SyinlfQztkj1dA7M0/ytC4BnEzpjCLQue4AdDZrv5WrFtmHP8AEs0lPcJpLR5lLuaknNC09EYPIyGNCB8kQ0luSlntSRan1QeRkWabt+iCkSwII6ofkkLNaEqwBJNKVYU6J2Lssl2Ju0pVpToLHLUZ4zMI6pFrkoDp3SEZRxTTGKty+YE5mkEbG4sVRMUf4lS6w0utw4twSTEqfPShplabhvNY5X4XVmr8MxWkO4tbVZpQaZ6GPIpRIyllMFXDNY/lSB9hzsdlrFDM17WPY4FrgCD1Wcf6LUNfrqy2j7G3pfqrTwvJJHhMUcwILSW68rHZcy9FIstWI1s9NG0w0zprjUttokabEsVDbigeWu5Waf5XKecSARuN291K01FnaPDlLe11CVJGrG1ezsOLYkwBtRh0hDti0tv+6jeIpvGoc743McNCx26sTacwRXe656lUTjjFI4Ii0O8xvZqmty0UlJVZTnz2qA4G4s6Nw66/9k5jlNRC+GQ3I8pPfkVD0ry6GYn3nOuPv6J/TktrXgcw362VpLZCMrQaNvmDjtlyuvzV8/DVxyVcTQfCZIHtce7bW/QKllrWOlLxdoPujcrQfw7dfB5Lta0iXkOw0VcG5EOVqBanFJuXXFJuK2nlhXpJyM8pNxSA4UEQldTAOClWlNwUdpQA6aUqCmrXJVrkAOWuSgcmwclGuQAsTomk1BRzzCWaljfIPiLRr6pwHLp1QOxpU4bSz0z4DBGGuFrZRZUeug9mnfCDfKbElXupq4qVhfK4C2w6qiVUhmnfI7dziVHJRo492IMe5huCVIU2Mvpxc3sEwy3CRk0vfoskkehB0PcY4vcKfJCxzpOV9FnWJ1E1ZUGWpkLnHvoPRTVbE9z3A2t1KjDSBzjc6XSj1idyTkI0cX5fQfd0+omB0j6h2gzGy54NozcZWjryCPSvM8zKemikle42aGt+7Jbl6FqK2OsPpZ6+pMcEbnOLtFqPD+Hf6XhrIHe+fM/1SXD+DwYRRtY1g8ZwBkedSXKTc5bcOPqrZ53Iz99L0dcUm4rjnJMuVjKBxSbig5yTc5FAdJQSbnIIA6HJRrk1DkcOXQDsOSrXJn4ga0kkADck7Ku4zxlT0RMVCGzyj4z7gP8AKQ0my5B1r30ATCt4hwqgB9proWuHwNdmd9AssxDH8RxG4nqXub/SNB9Aosk6i+6RRYmX/EvxIYwFuF0bnu/rn0H0Cr1bxvjlYWtdVNp2dKduX6nUqvFt9lzJ1SsqsaRoNKXeA1xkc+4vmc4klKBt73UPwlWioi9imdeSPWPqW/4Vm9mPQrNN7LwiM8mmyRfEXclLNpiRay77GRyUWy6RBeweLIAG3+Sct4cY9mYDK7sp2npACDbVSUMLQNRqpylsok0Vym4ZoJWNZWUwkAdf3iL+qnWw0VAA6OmZG1ot+XH7o+SfMjbfZKFl+WirDL1+iGTD39si24xhzn5G10Gfm0vAP0Kc+I1wu0gg8wUXEMEoMVjdHXUkcoPMixHoeSz3GsGqsBkdJh9ZP7M11jE95JaOxWiGdSZllxWvTNAL7oheqBR8UYhSnLI9tQwGxEg1+qtWGYrDiUJfGcrx7zHbhaTNKDRIOeky5ELkQuQIULlxIlyCADB6OHJrmRw9MZAcaYsYom0MRsXi8vYdFSjcnzW+SXxWqNbXzyn4nm3py/RNwbhTkzTCNI6hpzQFkL335JHYNOq5bXQrqAF0CQrSzSU8zJoXZZGG4K0/Aa6HF6FszLCVuksf9J/sVlgFt1JYPik2E1jainOmz2cnDopTh2RSEurNWZDlXXR7IuFYhT4nSNnp3XB0I5tPQp4GXKxO09mtVWhFjLbJzHHddZHql2tsuTo42OyUDNELIA6oOQbKjcczMioXN5yvsFeiQAbmyyPjbETW4sYYjeOG4A7k6q2GNyJ5HSIFzsoueeu6dYfWy0s7ZYnZSO+6j5veDemiOXEOt00W9MyNWaRRVjaymZMzmNR0KUL1WuF6uzZIHcz5VP5lQyyVMUzIJEuQQIOm2LSOiwuqew2cIjYoIIOl7M0JNx8ksRZcQUTSBduUEEwOtR7WbddQQCOHZC9hogghjJPBMTqsNrw6mfYOyhzTqHAnYrYYjmAJ3IuggsnI+jRhF27o6CCzljp2XG7oIJDI/iGokpcJqpYTZ7YiQe9liedz5szjck3PqUEFr45myhZf/p811/vn/kggtBElMEe5mIsyndwv89FcCUEFWPoz5PYQoIIJnJ//2Q=="
                    sx={{ width: 100, height: 100 }}
                  />
                </CardMedia>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    fontWeight={700}
                    component="div"
                  >
                    Sarah Johnson
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    fontWeight={500}
                    color="rgba(220, 20, 60, 1)"
                  >
                    Chief Executive Officer (CEO)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sarah leads our mission to save lives through blood
                    donations, bringing visionary leadership to our cause.
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    gap: "8px",
                  }}
                >
                  <FacebookIcon fontSize="large" cursor="pointer" />
                  <InstagramIcon fontSize="large" cursor="pointer" />
                  <LinkedInIcon fontSize="large" cursor="pointer" />
                </CardActions>
              </Card>
            </SwiperSlide>
            <SwiperSlide
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card elevation={0} sx={{ p: 5 }}>
                <CardMedia
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="data:image/jpeg;base64,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"
                    sx={{ width: 100, height: 100 }}
                  />
                </CardMedia>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    fontWeight={700}
                    component="div"
                  >
                    Sarah Johnson
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    fontWeight={500}
                    color="rgba(220, 20, 60, 1)"
                  >
                    Chief Executive Officer (CEO)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sarah leads our mission to save lives through blood
                    donations, bringing visionary leadership to our cause.
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    gap: "8px",
                  }}
                >
                  <FacebookIcon fontSize="large" cursor="pointer" />
                  <InstagramIcon fontSize="large" cursor="pointer" />
                  <LinkedInIcon fontSize="large" cursor="pointer" />
                </CardActions>
              </Card>
            </SwiperSlide>
          </Swiper>
        </Grid>
      </Container>
    </div>
  );
};

export default OurTeam;
