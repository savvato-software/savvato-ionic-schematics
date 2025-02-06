export interface <%= classify(name) %> {
    <% fields.forEach(field => { %>
        <%= field.name %>: <% if (field.type === 'String') { %>string<% }
        else if (['Long', 'Integer', 'Double', 'BigDecimal'].includes(field.type)) { %>number<% }
        else if (field.type === 'Boolean') { %>boolean<% }
        else if (field.type === 'LocalDateTime' || field.type === 'Date') { %>number<% }
        else if (field.type === 'enum') { %><%= classify(name) %><%= classify(field.name) %>Enum<% }
        else if (field.relation) { %><%= classify(field.relatedEntity) %><% }
        else { %>any<% } %>;
        <% }) %>
}

// If the entity contains any enums, define them here:
<% fields.filter(field => field.type === 'enum').forEach(field => { %>
    export enum <%= classify(name) %><%= classify(field.name) %>Enum {
        <% field.enumValues.forEach(ev => { %>
            <%= ev.toUpperCase() %> = "<%= ev %>",
            <% }); %>
    }
    <% }) %>
