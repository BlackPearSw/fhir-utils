var _ = require('lodash');

function isResource(object) {
    if (!object) {
        return false;
    }

    return object.resourceType !== undefined;
}

function isBundle(resource) {
    return resource.resourceType === 'Bundle'
}

function isParameters(resource) {
    return resource.resourceType === 'Parameters'
}

function hasContained(resource) {
    return resource.contained !== undefined
}

function isIdentifier(parameter) {
    return parameter.valueIdentifier !== undefined;
}

function ResourceVisitor() {

}

ResourceVisitor.prototype.visitParameters = function (parameter, op) {
    var self = this;

    if (isIdentifier(parameter)) {
        op(parameter); //TODO!
    }
    else {
        _.keys(parameter)
            .filter(function (key) {
                return key.startsWith('value');
            })
            .filter(function (key) {
                return isResource(parameter[key])
            })
            .forEach(function (key) {
                self.visit(parameter[key], op)
            });


        if (parameter.resource) {
            self.visit(parameter.resource, op);
        }

        if (parameter.part) {
            parameter.part
                .forEach(function (parameter) {
                    self.visitParameters(parameter, op);
                })
        }

    }
};

ResourceVisitor.prototype.visit = function (resource, op) {
    var self = this;

    if (!resource) {
        return;
    }

    if (!isResource(resource)) {
        return;
    }

    if (isBundle(resource)) {
        resource
            .entry
            .forEach(function (entry) {
                self.visit(entry.resource, op);
                self.visit(entry.content, op); //FHIR DSTU1 backwards compatibility
            });
    }

    if (isParameters(resource)) {
        if (!resource.parameters) {
            return;
        }

        resource
            .parameters
            .forEach(function (parameter) {
                self.visitParameters(parameter, op);
            });
    }

    if (hasContained(resource)) {
        resource
            .contained
            .forEach(function (resource) {
                self.visit(resource, op);
            });
    }

    op(resource);
};

module.exports = ResourceVisitor;