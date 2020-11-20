/* eslint-disable */
// sample store file - removable
import { GetterTree, MutationTree, ActionTree } from "vuex"

class State {
    count = 0;
}

const getters = {

} as GetterTree<State, any>;

const mutations = {
    increment(state)
    {
        state.count++;
    }
} as MutationTree<State>;

const actions = {

} as ActionTree<State, any>;

export default {
    namespaced: true,
    state: new State(),
    getters: getters,
    mutations: mutations,
    actions: actions
};