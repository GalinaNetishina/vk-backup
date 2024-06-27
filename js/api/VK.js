/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {
  static ACCESS_TOKEN ="vk1.a.F63mi6qrRSxBF5obh2BLRjA0Dk84VUG9Onpk5inLK2OHpya7aF3W8uwxkkOi1IvNO8BUCndKlRfDq7F4wGWhNp_72p-EgA_feDHzfT5ph5Ch6CLnvjrAO4OyIiQIEvgNpN5Y_Tpa0Ot8sexJKG3Xh5dfumVJ8E6u7I_ma0Ac5f_R_0XDnCr98E6wPNakOiAMcfpvomgce6lewaR1RIgy7g";
  static lastCallback;

  /**
   * Получает изображения
   * */
  static get(id = " ", callback) {
    this.lastCallback = callback;
    let count = 5;
    const script = document.createElement("script");
    script.id = "script";
    script.src = `https://api.vk.com/method/photos.get?owner_id=${id}&album_id=profile&extended=1&photo_sizes=1&count=${count}&callback=VK.processData
                  &access_token=${this.ACCESS_TOKEN}&v=5.154`;
    document.body.append(script);
  }

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result) {
    document.getElementById("script").remove();

    try {
      const photos = result.response.items;
      const photosList = [];

      if (photos.length === 0) {
        alert("Фотографии у профиля отсутствуют");
      }

      photos.forEach((element) => {
        const photosUrlList = element.sizes.at(-1).url;
        photosList.push(photosUrlList);
      });
      this.lastCallback(photosList);
      this.lastCallback = () => {};
    } catch (error) {
     console.error(error);
    }
  }
}
