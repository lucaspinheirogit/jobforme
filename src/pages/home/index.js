import React, { useState, useEffect } from 'react'
import Lottie from 'react-lottie';

import Card from '../../components/card'
import loadingData from '../../assets/loading.json'

import Topbar from '../../components/Topbar'
import Filters from '../../components/Filters'


import api from '../../services/api'
import groupByAttribute from '../../utils/groupByAttribute'
import searchData from '../../utils/searchData'


import './style.css'

export default function Home() {





    const [profiles, setProfiles] = useState([])
    const [showProfiles, setShowProfiles] = useState([])
    const [filter, setFilter] = useState('')
    const [sort, setSort] = useState('')
    const [isloading, setIsloading] = useState(true)
    const [error, setError] = useState(null)

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingData,

    }

    //Real time seaching
    const handlerSearchOnChange = async (event) => {
        const result = searchData(profiles, event.target.value)
        console.log(result)
        setShowProfiles(result)

    }


    useEffect(() => {

        async function fetchData() {
            const response = await api('https://spreadsheets.google.com/feeds/cells/1DIOjyvCrP8wim2oedHu3SgXoD3RAZFytSnCR0xjK7e4/1/public/full?alt=json')
            setTimeout(() => {
                const arrayProfile = response.feed.entry.map(({ gs$cell }) => {
                    return {
                        value: gs$cell.inputValue,
                        row: gs$cell.row
                    }
                })

                let rows = Object.values(groupByAttribute(arrayProfile, 'row'))
                let data = rows.map(row => row.map(element => element.value))
                console.log('data->', data)
                setProfiles(data)
                setShowProfiles(data)
                setIsloading(false)
            }, 1000)

        }

        try {
            fetchData()
        } catch (error) {
            console.log(error)
            setError(error)
        }

    }, [])

    return (
        <>
            <div>
                <Topbar />
                <Filters
                    handlerOnchange={handlerSearchOnChange}
                />
                {isloading &&
                    <div className="loading">
                        <Lottie className="lottieFile" options={defaultOptions}
                            height={"100%"}
                            width={"100%"}
                        />
                    </div>
                }
                <div className="container" >
                    {showProfiles.length > 0 && showProfiles.map((profile, index) => {
                        if (profile[0] === "Timestamp") {
                            return null
                        }
                        return <Card
                            key={index}
                            className="profile"
                            name={profile[2]}
                            cargo={profile[3]}
                            linkedin={profile[4]}
                            email={profile[1]}
                            cidade={profile[5]}
                        />
                    })}
                    {showProfiles.length === 0 && <h2>Nenhum candidato corresponde ao cargo</h2>}
                </div>
            </div>
        </>
    )
}