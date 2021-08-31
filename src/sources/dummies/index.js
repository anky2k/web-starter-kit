async function getInfiniteData(obj = {}) {
    const {
      country, translation, languages, version, page, limit, item_limit, pageId
    } = obj;
    let response = {};
    try {
      const arr = new Array(10).fill({
        'image': '/image/upload/w_599,h_337,c_scale,f_webp,q_auto:eco/resources/0-101-externalli_666746733/app_cover/1170x658withlogo_45191934.jpg'
      })
      response = arr
      return Promise.resolve(response);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  
  
  export { getInfiniteData };