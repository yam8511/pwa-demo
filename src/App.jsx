import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faBars, faBarcode } from '@fortawesome/free-solid-svg-icons'
import { isMobile } from 'react-device-detect';
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import Sidecar from './pages/Sidecar';
import Barcode from './pages/Barcode';
import BarcodeRecord from './pages/Barcode_Record';
import OCR from './pages/OCR';
import OcrRecord from './pages/OCR_Record';
import './App.scoped.css'

// 延遲載入
// const About = React.lazy(() => import("./pages/About"));

function App(props) {
  // console.group("====== APP ======")
  // console.log('props => ', props)
  // console.log('isLogin => ', isLogin)
  // console.groupEnd()

  const [, rerender] = useState('')
  const [sidebarHidden, toggleSidebar] = useState(false)
  const path = useLocation().pathname

  const links = [
    {
      path: '/',
      text: 'Home',
      element: <Home />,
    },
    {
      path: '/barcode',
      text: 'Barcode',
      element: <Barcode />,
      icon: faBarcode
    },
    {
      path: '/barcode_record',
      text: 'Barcode Record',
      element: <BarcodeRecord />
    },
    {
      path: '/ocr',
      text: 'OCR',
      element: <OCR />,
    },
    {
      path: '/ocr_record',
      text: 'OCR Record',
      element: <OcrRecord />,
    },
  ]

  let activeLink = undefined
  for (const link of links) {
    if (link.path === path) {
      activeLink = link
      break
    }
  }


  const isLogin = window.localStorage.getItem("login") === 'Y'
  // 左方導覽列 (sidecar)
  const sidecar = isLogin ?
    <Sidecar
      rerender={rerender}
      links={links}
      sidebarHidden={sidebarHidden}
      toggleSidebar={toggleSidebar}
    /> : ''

  // 最上方的那一列 (header)
  const header = <div className="leda-yellow w3-container">
    {
      isMobile ?
        <FontAwesomeIcon
          className="w3-xlarge w3-btn w3-round"
          icon={sidebarHidden ? faBars : faCaretLeft}
          onClick={() => toggleSidebar(!sidebarHidden)}
        /> : ''
    }
    <span className='w3-margin w3-xlarge'>
      {activeLink.text}
      {' '}
      {activeLink.icon ? <FontAwesomeIcon icon={activeLink.icon} /> : ''}
    </span>
  </div>


  // 主要頁面 (body)
  const routes = isLogin ?
    (
      <div className="Main w3-margin-bottom">
        <Routes>
          {links.map((route, i) =>
            <Route
              key={`route_${i + 1}`}
              path={route.path}
              element={route.element}
            ></Route>
          )}
          {/* 延遲載入 */}
          {/* <Route
            path="about"
            element={
              <React.Suspense fallback={<>...</>}>
                <About />
              </React.Suspense>
            }
          /> */}
          <Route path="*" element={<NotFound />} ></Route>
        </Routes>
      </div>
    ) : (
      <Routes>
        <Route path="*" element={<Login rerender={rerender} />}></Route>
      </Routes>
    )

  return (
    isLogin ?
      // 授權後的畫面
      <div className="App">
        {sidecar}
        <div
          className={`${isMobile ? 'Page-Mobile' : ''} ${sidebarHidden ? '' : 'offset'}`}
          onClick={() => {
            if (!sidebarHidden && isMobile) {
              toggleSidebar(true)
            }
          }}
        >
          {header}
          {routes}
        </div>
      </div >
      :
      // 登入畫面
      routes
  )
}

export default App;
