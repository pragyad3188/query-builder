import React, { Component } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../Icons/Icon.svg';
import RuleGroup from './RuleGroup';



class Query_Builder extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="h-4/5 w-2/3  bg-black rounded shadow-lg flex flex-col">
                <div className="bg-blue px-8 py-8 flex flex-col">
                    <div className="flex ">
                        <div className="font-medium text-lg leading-7 text-white grow">
                            Create tag and query
                        </div>
                        <div className="bg-indigo-700 justify-center rounded ">
                            <img src={closeIcon} className="inline-block m-1 " alt="close" />
                        </div>
                    </div>
                    <p className="text-indigo-300 font-normal text-sm font-sm m-0.5">
                    The query you build will be saved in your active view
                    </p>
                </div>
                
                <RuleGroup />
                <div className="m-2 ">
                    <button className={`bg-grey-1 py-2 px-5 text-white rounded-md font-medium text-base hover:bg-grey-2 opacity-70`}>Back</button>
                    <button className={`float-right bg-blue hover:bg-indigo-700 py-2 px-5 text-white rounded-md font-medium text-base`}>Finish</button>
                </div>


            </div>
        );
    }
}

Query_Builder.propTypes = {

};

export default Query_Builder;