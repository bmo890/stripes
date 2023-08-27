import { Cloudinary } from "@cloudinary/url-gen";
// import { Cloudinary } from 'cloudinary-react-native';

// export const cld = new Cloudinary({
//     cloud: {
//         cloudName: 'demo'
//         // cloudName: 'dgbaipmsg',
//         // apiKey: '227811224473768',
//         // apiSecret: "v0m4yHiH7kDBvfklVWidV2CDyvk",
//     }
// });

const CLOUDINARY_CLOUD_NAME = 'dgbaipmsg'
const CLOUDINARY_API_KEY = '227811224473768'
const CLOUDINARY_API_SECRET = 'v0m4yHiH7kDBvfklVWidV2CDyvk'

// Cloudinary.config({
//     cloud_name: CLOUDINARY_CLOUD_NAME,
//     api_key: CLOUDINARY_API_KEY,
//     api_secret: CLOUDINARY_API_SECRET,
//   });

  const cloudinaryInstance = new Cloudinary({
    cloud: {
        cloudName: CLOUDINARY_CLOUD_NAME,
        apiKey: CLOUDINARY_API_KEY,
        apiSecret: CLOUDINARY_API_SECRET
    }
});

export default cloudinaryInstance;
