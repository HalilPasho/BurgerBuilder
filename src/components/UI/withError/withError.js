import React, {Component} from 'react';
import Aux from '../../../hoc/Aux'
import Modal from '../../../components/UI/Modal/Modal'

const withError = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        componentWillMount() {
            this.reqInter = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req
            });

            this.resInter = axios.interceptors.response.use(res => res, error => {
                console.log(error)
                this.setState({error: error})
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInter);
            axios.interceptors.response.eject(this.resInter)
        }

        errorConfirmed = () => {
            this.setState({error: null});
        };

        render() {
            return (
                <Aux>
                    <Modal closed={this.errorConfirmed}
                           show={this.state.error}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
};

export default withError;