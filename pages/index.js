import React, { useState } from 'react'
import Head from 'next/head'
const offers = require('../offers.js')

export default function Index() {
  const [categoryFilter, setCategory]= useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  React.useEffect(() => {
    const navbar = document.getElementById("navbar");
    const sticky = window.pageYOffset + navbar.getBoundingClientRect().top
    window.onscroll = () => {
      window.pageYOffset >= sticky ? navbar.classList.add("sticky") : navbar.classList.remove("sticky")
    }
  });

  return (
    <div>
      <Head>
        <title>NHS Staff Offers</title>
        <meta name="description" content="NHS workers have been inundated with kind offers of support from a wide range of companies – from discounted taxi rides, to dedicated supermarket shopping times, to free food and discounted products."></meta>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="NHS staff offers and discounts" />
        <meta name="twitter:description" content="NHS workers have been inundated with kind offers of support from a wide range of companies – from discounted taxi rides, to dedicated supermarket shopping times, to free food and discounted products." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css" />
        <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
      </Head>
      <section className="hero is-info">
    <div className="hero-body">
      <div className="container ">
        <p>NHS workers have been inundated with kind offers of support from a wide range of companies – from discounted taxi rides, to dedicated supermarket shopping times, to free food and discounted products.</p>
        <p>On the <a href="https://www.england.nhs.uk/coronavirus/publication/list-of-nhs-staff-offers/">NHS Website</a>, they&apos;re <a href="https://www.england.nhs.uk/coronavirus/wp-content/uploads/sites/52/2020/03/NHS-Freebies-FTI-Spreadsheet-27.03.20.xlsx">hidden away in an excel document</a>, which isn&apos;t great if you want to check it quickly from your phone or whatever.</p>
        <p>Hopefully this is a bit easier!</p>
      </div>
    </div>
    </section>
    <div id="navbar">
      <div className="container">
        <div className="logo-container">
          <img
            width="120px"
            className="logo"
            src={`https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/NHS-Logo.svg/1280px-NHS-Logo.svg.png`}
          />
          <h1> <span className="u-hidden">NHS</span> staff offers</h1>
        </div>
        <div className="tabs">
          <ul>
            <li className={!categoryFilter ? 'is-active' : null}><a onClick={() => setCategory(null)}>All</a></li>
            { Object.keys(offers).map(category => {
              return <li key={category} className={categoryFilter === category ? 'is-active' : null}><a onClick={() => setCategory(category)}>{category}</a></li>
            })
            }
          </ul>
        </div>
        <div className="field">
          <div className="control has-icons-right">
            <input
              name="search"
              type="text"
              placeholder="filter results, e.g. discount"
              className="input"
              onChange={e => setSearchQuery(e.target.value)}
            />
            <span className="icon is-small is-right">
              <i className="fas fa-search"></i>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div className="container">
    { Object.keys(offers).filter(category => categoryFilter ? categoryFilter === category : true  ).map(category => {
        return   <div className="panel" key={category}>
          <h2 className="panel-heading category">{category}</h2>
          <ul>
          { filterResults(offers[category], searchQuery).length === 0 ?
            <div className="card-content">No Results</div>
            : filterResults(offers[category], searchQuery).map(offer => {
            return <li className="offer is-paddingless">
              <div className="card-content">
              <h2 className="subtitle">
              { offer.link ?
               <a href={offer.link}>{offer.organisation}{" "}
                 <img
                   height="16"
                   width="16"
                   alt={`${offer.organisation} favicon`}
                   src={`http://www.google.com/s2/favicons?domain=${offer.link}`}
                 />
               </a> : <span>{offer.organisation}</span> } - <small>{offer.category}</small>
              </h2>
              <div>
                <h3>Location</h3>
                <span>{offer.region} { offer.subRegion ? <span> - {offer.subRegion}</span> : null }</span>
              </div>
              <div>
                <h3>Details</h3>
                <span>{offer.details}</span>
              </div>
              <div>
                <h3>Access</h3>
                <span>{offer.access}</span>
              { offer.terms ?
                <div>
                  <h3>Terms</h3>
                  <span>{offer.terms}</span>
                </div>
              : null }
              </div>
            </div>
            </li>
          })
          }
          </ul>
        </div>
      })
    }
    </div>
    <footer className="footer">
      <div className="container">
        <div className="content has-text-centered">
          <p>
            <strong>Thanks NHS Folks!</strong>
          </p>
          <p>And nice one all the companies above for giving some discounts to those guys.</p>
        </div>
      </div>
    </footer>
    <style jsx>{`
      .hero a {
        color: white;
        text-decoration: underline;
      }
      .category {
        font-weight: bold;
        font-size:1.6em;
      }
      p {
        padding-bottom: 1em;

      }
      .offer {
        padding-bottom: 3em;
      }
      .offer div {
        display:block;
        padding-bottom: 1em;
      }
      .offer h2 {
        font-weight:bold;
      }
      .offer h3 {
        display:inline-block;
        font-weight:bold;
        width:80px;
        padding-right:10px;
      }
      .offer h3::after {
        content: ":";
      }
      .offer p {
        float:left;
      }
      .logo-container {
        display: flex;
        align-items: center;
      }
      .logo {
        margin-right: 10px;
        padding: 10px;
        background-color: #005db8;
      }
      .sticky {
        position: fixed;
        top: 0;
        width: 100%;
      }
      .sticky + .container {
        padding-top: 185px;
      }
      #navbar {
        background-color: white;
        padding: 5px;
        padding-bottom: 15px;
        z-index: 2;
      }
      .u-hidden {
        display: none;
      }
    `}</style>
    </div>
  );
}

function filterResults(offers, query) {
  if (!query || query === "") {
    return offers;
  }
  return offers.filter(offer =>
    Object.keys(offer).some(
      key =>
        offer[key] && offer[key].toLowerCase().includes(query.toLowerCase())
    )
  );
}
