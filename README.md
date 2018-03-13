# fhir-utils
Utility functions for manipulation of HL7 FHIR STU3 resources.

## ResourceVisitor
### use

    var utils = require('fhir-utils');

    var visitor = new utils.ResourceVisitor();

### visit
Visit all resources and calls op with each one

    function op(resource){
        //resource operation
    }

    visitor.visit(resource, op);

Visits:
* Bundled resources (including DSTU1 format for backwards compatibility)
* contained resources
* Parameters ($.parameter.value<Resource>)
* Parameters ($.parameter.resource)
* Parameters ($.parameter.part.value<Resource>)
* Parameters ($.parameter.part.resource)

## ResourceHelper
### use

    var utils = require('fhir-utils');

    var helper = new utils.ResourceHelper();

### resourceTypes
Array of all resourceTypes from http://hl7.org/fhir/codesystem-resource-types.html

### capitalisedType
Returns correctly capitalised resourceType

## Test
To execute unit tests:

    npm install
    npm test

## Copyright
Copyright 2018+ Black Pear Software Ltd.

## License
fhir-utils is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

fhir-utils is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

Acknowledgements
----------------
Supported by [Black Pear Software](www.blackpear.com)