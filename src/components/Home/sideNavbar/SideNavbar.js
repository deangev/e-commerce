import React, { useEffect, useRef, useState } from 'react';
import { Nav, Tab } from 'react-bootstrap';
import './sideNavbar.css';
import navs from './sideNavs';
import AccessoriesNav from '../navs/AccessoriesNav';
import FootwearNav from '../navs/FootwearNav';
import HomeNav from '../navs/HomeNav';
import JeansNav from '../navs/JeansNav';
import OuterwearNav from '../navs/OuterwearNav';
import PantsNav from '../navs/PantsNav';
import ShirtsNav from '../navs/ShirtsNav';
import TShirtsNav from '../navs/TShirtsNav';
import ShortsNav from '../navs/ShortsNav';
import Product from '../product/Product';

export default function SideNavbar() {
    const [activeKey, setActiveKey] = useState('Home');
    const prevActive = usePrevious(activeKey);

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            if (a) {
                ref.current = value;
            }
        }, [value]);
        return ref.current;
    }

    const a = activeKey === 'Home' || activeKey === 'Accessories' || activeKey === 'Footwear' || activeKey === 'Jeans' ||
        activeKey === 'Outerwear' || activeKey === 'Pants' || activeKey === 'Shirts' || activeKey === 'T-Shirts' || activeKey === 'Shorts';

    return (
        <div id="navs-container" className="d-flex">
            <Tab.Container className="tab-container" activeKey={activeKey} onSelect={setActiveKey}>
                <Nav className="navs-container col-3 d-flex flex-column">
                    {navs.map(nav => {
                        return (
                            <Nav.Item className="nav-container" key={nav.id}>
                                <Nav.Link eventKey={`${nav.title}`} className="nav-title">{nav.title}</Nav.Link>
                            </Nav.Item>
                        )
                    })}
                </Nav>
                <Tab.Content className="col-9 border-top pt-3">
                    <h4 className="pb-4">{activeKey === 'Home' ? null : a ? `Home > ${activeKey}` : `Home > ${prevActive} > ${activeKey}`}</h4>
                    <h1 className="pb-5">{a && activeKey}</h1>
                    <Tab.Pane eventKey='Home'>
                        <HomeNav setActiveKey={setActiveKey} />
                    </Tab.Pane>
                    <Tab.Pane eventKey='Accessories'>
                        <AccessoriesNav setActiveKey={setActiveKey} />
                    </Tab.Pane>
                    <Tab.Pane eventKey='Footwear'>
                        <FootwearNav setActiveKey={setActiveKey} />
                    </Tab.Pane>
                    <Tab.Pane eventKey='Jeans'>
                        <JeansNav setActiveKey={setActiveKey} />
                    </Tab.Pane>
                    <Tab.Pane eventKey='Outerwear'>
                        <OuterwearNav setActiveKey={setActiveKey} />
                    </Tab.Pane>
                    <Tab.Pane eventKey='Pants'>
                        <PantsNav setActiveKey={setActiveKey} />
                    </Tab.Pane>
                    <Tab.Pane eventKey='Shirts'>
                        <ShirtsNav setActiveKey={setActiveKey} />
                    </Tab.Pane>
                    <Tab.Pane eventKey='T-Shirts'>
                        <TShirtsNav setActiveKey={setActiveKey} />
                    </Tab.Pane>
                    <Tab.Pane eventKey='Shorts'>
                        <ShortsNav setActiveKey={setActiveKey} />
                    </Tab.Pane>
                    <Tab.Pane eventKey={!a && activeKey}>
                        <Product />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </div>
    )
}
