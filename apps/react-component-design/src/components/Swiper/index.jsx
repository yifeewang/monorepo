import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

// import './index.less'
require('!style-loader!css-loader!less-loader!./index.less')
const imgDataFour = [{
    name: '美肤专家团',
    img: 'https://sucai.suoluomei.cn/sucai_zs/images/20191203142553-10e8e9b9f13c14b6ac3aa516a30802b.png',
}, {
    name: '私户专家团',
    img: 'https://sucai.suoluomei.cn/sucai_zs/images/20191203142619-6c6872faf293abfc4939a7ea6eb1402.png',
}, {
    name: 'a 专家团',
    img: 'https://sucai.suoluomei.cn/sucai_zs/images/20191203142553-10e8e9b9f13c14b6ac3aa516a30802b.png',
}
]
export default function Swipe() {

  return (
    <Swiper
      spaceBetween={-60} //幻灯片之间的距离
      slidesPerView={3} //视图幻灯片数量
      centeredSlides={true} //活动幻灯片将居中
      loop={false} // 是否循环
      className={'mySwiper2'}
    >
      {imgDataFour.map((e, i) => {
        return (
          <SwiperSlide key={i}>
            <img src={e.img} alt={name} />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
