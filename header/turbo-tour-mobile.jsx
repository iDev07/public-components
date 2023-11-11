import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import axios from "axios";
import ClearIcon from "@mui/icons-material/Clear";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../store/store";
import { Container } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
const DropdownContainer = styled.div`
  width: 100%;
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  margin: 10px 0;
  background-color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  font-size: 18px;
  color: #004074;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  list-style: none;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 10px;
  margin: 0;
  display: ${({ open }) => (open ? "block" : "none")};
  width: 100%;
`;

const DropdownItem = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

function MobileHeader() {
  const router = useRouter();
  const [hiddenNavVisible, setHiddenNavVisible] = useState(false);
  const [scroll, setScroll] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPackages, setFilteredPackages] = useState([]);
  const cartQuantity = useAppSelector((state) => state.cart.quantity);
  const defaultLang = localStorage.getItem("lang") || "uz";
  const handleSearchChange = (event) => {
    const searchText = event.target.value;
    setSearchQuery(searchText);

    const filtered = tourpackages.filter(
      (tourpackage) =>
        tourpackage.title_uz.toLowerCase().includes(searchText.toLowerCase()) ||
        tourpackage.title_ru.toLowerCase().includes(searchText.toLowerCase()) ||
        tourpackage.title_en.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredPackages(filtered);
  };
  useEffect(() => {
    // Clear the search query when the user navigates to another page
    setSearchQuery("");
  }, [router.pathname]); // Listen for changes in the route

  const [lang, setLang] = useState(defaultLang);
  const handleChange = (event) => {
    setLang(event.target.value);
    localStorage.setItem("lang", event.target.value);
    i18n.changeLanguage(event.target.value);
    window.location.reload();
  };
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY < 200) {
        setScroll("");
      } else {
        setScroll("mobscrolled");
      }
    });
  }
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const toggleHiddenNav = () => {
    setHiddenNavVisible(!hiddenNavVisible);
  };

  // Function to hide the hidden nav
  const hideHiddenNav = () => {
    setHiddenNavVisible(false);
  };
  const [tourpackages, setTourPackages] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    // Fetch both tour packages and categories data
    axios
      .all([
        axios.get("https://api.all4u-tour.uz/tourpackages"),
        axios.get("https://api.all4u-tour.uz/categories"),
      ])
      .then(
        axios.spread((tourPackagesResponse, categoriesResponse) => {
          setTourPackages(tourPackagesResponse.data);
          setCategories(categoriesResponse.data);
          // setLoading(false);
        })
      )
      .catch((error) => {
        console.error("An error occurred:", error);
        // setLoading(false);
      });
  }, []);
  return (
    <div className={`MobileHeader  ${scroll}`}>
      <div className="mobheader_wrapper">
        <Container maxWidth="lg">
          <div className="mobheader_wrap">
            <div className="menu">
              <button id="openMenuBtn" onClick={toggleHiddenNav}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="52"
                  height="52"
                  viewBox="0 0 52 52"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M39.7904 26.0003C39.7904 25.5693 39.6192 25.156 39.3144 24.8513C39.0097 24.5465 38.5963 24.3753 38.1654 24.3753H13.832C13.4011 24.3753 12.9877 24.5465 12.683 24.8513C12.3782 25.156 12.207 25.5693 12.207 26.0003C12.207 26.4313 12.3782 26.8446 12.683 27.1494C12.9877 27.4541 13.4011 27.6253 13.832 27.6253H38.1654C38.5963 27.6253 39.0097 27.4541 39.3144 27.1494C39.6192 26.8446 39.7904 26.4313 39.7904 26.0003ZM42.7904 15.167C42.7904 14.736 42.6192 14.3227 42.3144 14.0179C42.0097 13.7132 41.5963 13.542 41.1654 13.542H10.832C10.4011 13.542 9.98773 13.7132 9.68298 14.0179C9.37824 14.3227 9.20703 14.736 9.20703 15.167C9.20703 15.598 9.37824 16.0113 9.68298 16.316C9.98773 16.6208 10.4011 16.792 10.832 16.792H41.1654C41.5963 16.792 42.0097 16.6208 42.3144 16.316C42.6192 16.0113 42.7904 15.598 42.7904 15.167ZM35.7904 36.8337C35.7904 36.4027 35.6192 35.9894 35.3144 35.6846C35.0097 35.3799 34.5963 35.2087 34.1654 35.2087H17.832C17.4011 35.2087 16.9877 35.3799 16.683 35.6846C16.3782 35.9894 16.207 36.4027 16.207 36.8337C16.207 37.2646 16.3782 37.678 16.683 37.9827C16.9877 38.2875 17.4011 38.4587 17.832 38.4587H34.1654C34.5963 38.4587 35.0097 38.2875 35.3144 37.9827C35.6192 37.678 35.7904 37.2646 35.7904 36.8337Z"
                    fill="#004074"
                  />
                </svg>
              </button>
            </div>
            <div className="logo">
              <Link href={"/"}>
                <img src="/img/turbo.png" alt="TURBO TOUR LOGO" />
              </Link>
            </div>
            <div className="cart">
              <Link href={"/cart"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"
                    fill="#0073DB"
                  />
                </svg>
                <span id="qty">{cartQuantity}</span>
              </Link>
            </div>
            <div className="language">
              <select name="lang" value={lang} onChange={handleChange}>
                <option value="en">EN</option>
                <option value="ru">Ру</option>
                <option value="uz">UZ</option>
              </select>
            </div>
          </div>
          <div
            className="main_hidden_nav"
            style={{
              opacity: hiddenNavVisible ? 1 : 0,
              visibility: hiddenNavVisible ? "visible" : "hidden",
              overflow: hiddenNavVisible ? "visible" : "hidden",
            }}
          >
            <div className="this_wrap">
              <div className="main_links_wrap">
                <div className="search_wrap">
                  <form action="">
                    {" "}
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder={t("menu.search")}
                    />
                    <div className="search_icon">
                      <button type="submit">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                        >
                          <path
                            d="M21 21.5L15 15.5M3 10.5C3 11.4193 3.18106 12.3295 3.53284 13.1788C3.88463 14.0281 4.40024 14.7997 5.05025 15.4497C5.70026 16.0998 6.47194 16.6154 7.32122 16.9672C8.1705 17.3189 9.08075 17.5 10 17.5C10.9193 17.5 11.8295 17.3189 12.6788 16.9672C13.5281 16.6154 14.2997 16.0998 14.9497 15.4497C15.5998 14.7997 16.1154 14.0281 16.4672 13.1788C16.8189 12.3295 17 11.4193 17 10.5C17 9.58075 16.8189 8.6705 16.4672 7.82122C16.1154 6.97194 15.5998 6.20026 14.9497 5.55025C14.2997 4.90024 13.5281 4.38463 12.6788 4.03284C11.8295 3.68106 10.9193 3.5 10 3.5C9.08075 3.5 8.1705 3.68106 7.32122 4.03284C6.47194 4.38463 5.70026 4.90024 5.05025 5.55025C4.40024 6.20026 3.88463 6.97194 3.53284 7.82122C3.18106 8.6705 3 9.58075 3 10.5Z"
                            stroke="#004074"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </form>
                  {searchQuery && (
                    <ul className="hidden_ul_search">
                      {filteredPackages.map((tourpackage) => (
                        <li key={tourpackage.id}>
                          <Link
                            href={`/tourpackage/${tourpackage.id}`}
                            onClick={hideHiddenNav}
                          >
                            {i18n.language === "uz"
                              ? tourpackage.title_uz
                              : i18n.language === "ru"
                              ? tourpackage.title_ru
                              : tourpackage.title_en}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="categories">
                  <DropdownContainer>
                    <DropdownButton onClick={toggleDropdown}>
                      {selectedOption || "Узбекистан"}
                      <KeyboardArrowDown />
                    </DropdownButton>
                    <DropdownList open={isOpen}>
                      {categories.map((category) => (
                        <DropdownItem key={category.id}>
                          <Link
                            href={`/category/${category.id}`}
                            onClick={hideHiddenNav}
                          >
                            {i18n.language === "uz"
                              ? category.name_uz
                              : i18n.language === "ru"
                              ? category.name_ru
                              : category.name_en}
                          </Link>
                        </DropdownItem>
                      ))}
                    </DropdownList>
                  </DropdownContainer>
                </div>
                <div className="other_links">
                  <Link href={"/"} onClick={hideHiddenNav}>
                    {t("menu.bron")}
                  </Link>
                </div>
                <div className="other_links">
                  <Link href={"/team"} onClick={hideHiddenNav}>
                    {t("menu.team")}
                  </Link>
                </div>
                <div className="other_links">
                  <Link href={"/contacts"} onClick={hideHiddenNav}>
                    {" "}
                    {t("menu.contacts")}
                  </Link>
                </div>
                <div className="close_modal">
                  <button onClick={hideHiddenNav}>
                    <ClearIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default MobileHeader;
