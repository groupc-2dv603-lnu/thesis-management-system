'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div class="topbar">
                    {/* dropdown menu (normally hidden) */}
                    <div class="dropdown-button">
                        <i class="fa fa-bars"></i>
                        <div class="dropdown-menu">
                            <a>menu item #1</a>
                            <a>menu item #2</a>
                            <a>menu item #3</a>
                        </div>
                    </div>
                    <div class="fluid-container">
                        <div class="logo">
                            <i class="fas fa-feather"></i>
                            thesis mgmt
                        </div>
                        {/* default menu */}
                        <div class="menu">
                            <a>menu item #1</a>
                            <a>menu item #2</a>
                            <a>menu item #3</a>

                        </div>
                    </div>
                    <select class="role">
                        <option>Role: Student</option>
                        <option>Role: Opponent</option>
                    </select>
                </div>
                {/*  Content */}
                <div class="fluid-container content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt augue ut nibh facilisis, in lobortis neque iaculis. Donec at mauris euismod, placerat mi et, consequat quam. Nullam eu metus ut leo consequat sollicitudin porttitor eget sapien. Suspendisse potenti. Vestibulum in velit quis augue congue fringilla id ut dolor. Curabitur lobortis scelerisque dui at tempus. In euismod purus ut finibus semper.
                    <br /><br />
                    Etiam suscipit quam justo, et viverra arcu maximus a. Vestibulum tristique diam ante, eget pellentesque augue ultricies id. Donec at tincidunt leo, sit amet gravida mauris. Cras laoreet purus vel vestibulum pretium. Aliquam placerat diam ac turpis scelerisque, a sagittis nisi eleifend. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam lobortis elementum aliquam. Integer scelerisque vestibulum velit, nec fringilla tortor posuere nec. Proin vitae urna sodales, egestas est ac, hendrerit mi. Aenean quis magna sit amet ipsum imperdiet efficitur id eu tellus. Mauris lacinia ex id congue tempor. Quisque varius massa vel urna facilisis, quis posuere diam volutpat.
                    <br /><br />
                    In aliquam enim et dolor eleifend, sed interdum mi tempus. Sed maximus justo et semper lacinia. Maecenas eget vulputate libero, sit amet egestas nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent tincidunt egestas iaculis. Nam risus eros, consequat sed nunc sed, eleifend placerat massa. Proin consectetur interdum sollicitudin. Phasellus sit amet nulla eu dolor accumsan malesuada non quis orci. Praesent eu sapien metus.
                    <br /><br />
                    Mauris eget sapien sapien. Nam pretium quam ut magna ullamcorper scelerisque. Donec pharetra congue sem at finibus. Suspendisse nec purus id metus mollis luctus non vel ante. Donec nec sem eget enim dictum euismod at vitae ex. Etiam lectus nunc, bibendum ac convallis venenatis, imperdiet id libero. Fusce sodales, erat at sodales sodales, lacus tortor consequat turpis, dignissim porta nibh velit at orci.
                </div>
            </div>
        )
    }
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)
