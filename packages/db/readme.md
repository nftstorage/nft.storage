# Pinata backup

```
 Map(
  Paginate(
   Distinct(Difference(
        Match(Index("all_pins-content")),
        Match(Index("pin_by_org_values_content"), 'pinata')
    ))
  ),
  Lambda("x", Var("x"))
)

{
  name: "all_pins-content",
  unique: false,
  serialized: true,
  source: "Pin",
  values: [
    {
      field: ["data", "content"]
    }
  ]
}

{
  name: "pin_by_org_values_content",
  unique: false,
  serialized: true,
  source: "Pin",
  terms: [
    {
      field: ["data", "org"]
    }
  ],
  values: [
    {
      field: ["data", "content"]
    }
  ]
}

```
