import { FilterItem } from '../filterlist/filteritem';

export const FilterList: FilterItem[] = [
        {
            
            name: 'By Node Health',
            details: [
                {
                    name: 'OK',
                },
                {
                    name: 'Warning'
                },
                {
                    name: 'Error'
                },
                {
                    name: 'Transitional'
                },
                {
                    name: 'Unapproved'
                },
                // {
                //     name: 'the ui test by jingjing li for the text length test'
                // }
            ]
        },
        {
            
            name: 'By Node State',
            details: [
                {
                    name: 'Online'
                },
                {
                    name: 'Offline'
                },
                {
                    name: 'Draining'
                },
                {
                    name: 'Provisioning'
                },
                {
                    name: 'Rejected'
                },
                {
                    name: 'Not-Deployed'
                }
            ]
        },
        {
           
            name: 'By Group',
            details: [
                {
                    name: 'HeadNodes'
                },
                {
                    name: 'ComputeNodes'
                },
                {
                    name: 'WCFBrokerNodes'
                },
                {
                    name: 'WorkstationNodes'
                },
                {
                    name: 'AzureNodes'
                },
                {
                    name: 'UnmanagedServerNodes'
                },
                {
                    name: 'LinuxNodes'
                },
                {
                    name: 'AzureBatchServicePools'
                }
            ]
        },
        {
            name: 'By Node Template',
            details: [
                {
                    name: 'Default ComputeNode Template'
                },
                {
                    name: 'HeadNode Template'
                },
                {
                    name: 'Linux Template'
                },
                {
                    name: 'NonDomain ComputeNode Template'
                }
            ]
        }
    ];