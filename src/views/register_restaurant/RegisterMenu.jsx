import React, { useState } from 'react';
import Navigation from '@/components/common/Navigation';
import { Field, Form, Formik, useFormikContext } from 'formik';
import { useNavigate, useLocation } from "react-router-dom";
import ProgressIndicator from '@/components/common/ProgressIndicator';
import useRestaurant from '@/hooks/useRestaurant';

const RegisterMenu = () => {
  var navigate = useNavigate();
  const location = useLocation();
  const { addToRestaurant } = useRestaurant();

  var restaurantInfo = location.state.restaurantInfo; // RegisterRestaurant 페이지에서 전달받은 데이터
  const [menuItems, setMenuItems] = useState([]); // 메뉴 리스트 초기화

  /**
   * 식당 최종 등록 헨들러
   * @param {Array} menuItems 추가된 메뉴 리스트
   */
  const handleAddRestarant = (menuItems) => {
    addToRestaurant(restaurantInfo, menuItems); // 식당 등록
  };

  return (
    <div>
      <Navigation />
      <ProgressIndicator currentPage="menu" />
      <div className="mx-auto m-4 w-1/2 border p-4">
        <h3 className="my-4 text-center text-xl font-bold">메뉴 등록</h3>
        <Formik
          initialValues={{ menu: '', price: 0, image:'' }}
          onSubmit={(values, {resetForm}) => {
            setMenuItems([...menuItems, values]); // 메뉴 추가
            alert('메뉴가 추가되었습니다.');
            resetForm(); // Form 초기화
          }}
        >
          {() => (
            <Form>
              <div className="text-center">
                <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="name">
                  메뉴 이름
                </label>
                <Field
                  name="menu"
                  type="text"
                  label="메뉴 이름"
                  placeholder="음식명"
                  required
                  className="w-full border py-2 text-center"
                />
              </div>
              <div className="text-center">
                <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="address">
                  가격
                </label>
                <Field
                  name="price"
                  type="number"
                  label="가격"
                  placeholder="5000"
                  min={1} // 최소값
                  required
                  className="w-full border py-2 text-center"
                />
              </div>
              <div className="text-center">
                <label className="block pb-2 pt-4 text-sm font-bold" htmlFor="image">
                  메뉴 이미지
                </label>
                <Field
                  name="image"
                  type="file"
                  label="메뉴 이미지"
                  className="w-full border py-2 text-center"
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full rounded bg-orange-300 px-4 py-2 font-bold text-white hover:bg-orange-500"
              >
                메뉴 추가
              </button>
              <div className='flex space-x-4'>
                <button
                  type="button"
                  className="mt-4 w-full rounded bg-gray-300 px-4 py-2 font-bold text-white hover:bg-gray-500"
                  onClick={() => {
                    navigate(-1); // 이전 페이지로 이동
                  }}
                >
                  이전
                </button>
                <button
                  type="button"
                  className="mt-4 w-full rounded bg-red-300 px-4 py-2 font-bold text-white hover:bg-red-500"
                  onClick={() => handleAddRestarant(menuItems)}
                >
                  등록
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div></div>
    </div>
  );
};
export default RegisterMenu;