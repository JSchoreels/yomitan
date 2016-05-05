/*
 * Copyright (C) 2016  Alex Yatskov <alex@foosoft.net>
 * Author: Alex Yatskov <alex@foosoft.net>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


function registerKanjiLinks() {
    for (const link of [].slice.call(document.getElementsByClassName('kanji-link'))) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.parent.postMessage({action: 'displayKanji', data: e.target.innerHTML}, '*');
        });
    }
}

function registerActionLinks() {
    for (const link of [].slice.call(document.getElementsByClassName('action-link'))) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const ds = e.currentTarget.dataset;
            window.parent.postMessage({action: 'addNote', data: {index: ds.index, mode: ds.mode}}, '*');
        });
    }
}

function onDomContentLoaded() {
    registerKanjiLinks();
    registerActionLinks();
}

function onMessage(e) {
    const {action, data} = e.data, handlers = {
        'disableAction': ({mode, index}) => {
            const matches = document.querySelectorAll(`.action-link[data-index="${index}"][data-mode="${mode}"]`);
            matches[0].classList.add('disabled');
        }
    };

    handlers[action](data);
}

document.addEventListener('DOMContentLoaded', onDomContentLoaded, false);
window.addEventListener('message', onMessage);
