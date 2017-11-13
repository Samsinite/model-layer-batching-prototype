Thinking about entities, redux store/store event changes (redux has good standards
for this), repositories for fetching data from the server, an ember-data style "store"
that can be used to ONLY grab the current state from the store and persist it into an
entity that represents the state of the object in the store AT THAT POINT IN TIME. To
make reloading an entity easier, it can have a refresh or reload method that erases
and resets the current state to what is in the DB. The store can have methods that
fetch objects from the store and probably should have some array/functional style
of set logic for selecting data. Everything is model driven, and entites SHOULD NOT
know the model relationship, the repositories SHOULD. The entity should define the
data the redux holds in its DB, which WILL require a unique ID for each entity.
Entities should also have a type specified for each attribute, so that a serialzier
can know how the data coming in needs to be casted.

