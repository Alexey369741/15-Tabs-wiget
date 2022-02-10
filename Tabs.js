class Tabs {
    #navEl;
    #contentEl;
    #activeTabIndex;


    static NAV_ITEM_CLASS = 'nav-item';
    static CONTENT_ITEM_CLASS = 'content-item';
    static NAV_ITEM_ACTIVE_CLASS = 'nav-item-active';
    static CONTENT_ITEM_ACTIVE_CLASS = 'content-item-active';

    constructor(rootEl) {
        const ACTIVE_TAB_INDEX_DEFAULT = 0;

        const [navEl, contentEl] = rootEl.children;

        this.#navEl = navEl;
        this.#contentEl = contentEl;

        this.bindStyles();
        this.bindEvents();
        this.setActiveTab(ACTIVE_TAB_INDEX_DEFAULT);
    }

    bindStyles() {
        for (let navItemEl of this.#navEl.children) {
            navItemEl.classList.add(Tabs.NAV_ITEM_CLASS);
        }
        for (let contentItemEl of this.#contentEl.children) {
            contentItemEl.classList.add(Tabs.CONTENT_ITEM_CLASS);
        }
    }

    bindEvents() {
        this.#navEl.addEventListener('click', (e) => this.onNavElClick(e))
    }

    onNavElClick(e) {
        if (e.target.classList.contains(Tabs.NAV_ITEM_CLASS)) {
            const newActiveTabIndex = this.getNavItemElIndex(e.target);

            this.hideActiveTab();
            this.setActiveTab(newActiveTabIndex);
        }
    }

    setActiveTab(index) {
        const [navItemEl, contentItemEl] = this.getTabItemByIndex(index);

        navItemEl.classList.add(Tabs.NAV_ITEM_ACTIVE_CLASS);
        contentItemEl.classList.add(Tabs.CONTENT_ITEM_ACTIVE_CLASS);

        this.#activeTabIndex = index;
    }

    hideActiveTab() {
        const [navItemEl, contentItemEl] = this.getTabItemByIndex(this.#activeTabIndex);

        navItemEl.classList.remove(Tabs.NAV_ITEM_ACTIVE_CLASS);
        contentItemEl.classList.remove(Tabs.CONTENT_ITEM_ACTIVE_CLASS);
    }

    getTabItemByIndex(index) {
        return [this.#navEl.children[index], this.#contentEl.children[index]]
    }

    getNavItemElIndex(el) {
        const navItemEl = el.closest('.' + Tabs.NAV_ITEM_CLASS);

        for (let i = 0; i < this.#navEl.children.length; i++) {
            const currentNavItemEl = this.#navEl.children[i];

            if (currentNavItemEl === navItemEl) {
                return i;
            }
        }
    }
}

export default Tabs;