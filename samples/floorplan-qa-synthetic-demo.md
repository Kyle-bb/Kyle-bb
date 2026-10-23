# Synthetic source-to-model QA demonstration

Prepared for a freelance QA application on 24 October 2026. This is new AI-created demonstration work, not a client project, an INK TO BRICK product test, or prior professional experience. Codex authored and executed the fixture, auditor and checks on Kyle Bowman's behalf. It demonstrates structured-data comparisons only, and does not establish drawing interpretation, CAD/3D visual expertise, or construction/safety certification.

All source measurements and model records below are fictional and may be copied for reviewing this demonstration. Save the seven blocks using their shown filenames in one directory, then run `python -m unittest -v test_audit` and `python audit.py` with Python 3. The actual included run used Python 3.12.14: six tests passed, the deliberately seeded revision produced three expected discrepancies, and the corrected revision produced none. No external service, account, client data or paid tooling was used.

## REPORT.txt

```text
NEW AI-CREATED SYNTHETIC QA SAMPLE — NOT REAL PRODUCT OR CLIENT FINDINGS

Purpose
Demonstrate a small, repeatable comparison between fictional source measurements
and fictional model records. All files were created with Codex for this sample.
No INK TO BRICK product, real floorplan, client data or external service was tested.

Reproduction
1. Use Python 3 standard library; no installs, external network or accounts needed.
2. From this directory: python audit.py
3. Compare model-seeded.json against source-plan.json, then model-corrected.json.
4. Run regression checks: python -m unittest -v test_audit

Rules
All dimensions are metres. Confirmed positive finite source dimensions are compared
with an illustrative 0.01 m inclusive tolerance. This is a sample rule, not a stated
product tolerance or professional accuracy standard. Ambiguous/invalid sources and
unconfirmed units produce review items rather than asserted software defects.

Three deliberately seeded discrepancies (illustrative severity only)
SYN-01 | Medium | R1 width
Expected source: 4.00 m; seeded model: 4.30 m. A comparison would misrepresent the
fictional room by 0.30 m. Corrected model restores 4.00 m.

SYN-02 | Medium | D1 opening width
Expected source: 0.90 m; seeded model: 0.75 m. The opening differs by 0.15 m.
Corrected model restores 0.90 m. No accessibility/clearance conclusion is claimed.

SYN-03 | Medium | F1 semantic classification
Expected source: furniture (freestanding wardrobe); seeded model: wall.
Corrected model restores furniture. The fixture's model record itself is wrong;
the fictional hidden_ids list is empty in both revisions. No rendered viewer was
inspected, so this is not evidence of ruling out a real hidden-wall/display bug.

Other coverage
Two rooms, a door, a window, a furniture fixture and a directed connection between
fictional floors. The comparison checks connection identity/direction, dimension
thresholds, invalid inputs, source ambiguity and unconfirmed units. Source IDs are
assumed unique and this small schema is assumed structurally complete.

Limits
This is structured-data QA only. It does not prove image/drawing interpretation,
CAD/3D visual inspection, UI/browser testing, geometry intersection/topology,
architectural expertise, professional tenure or prior client work. There is no
construction, accessibility, structural or safety certification. A real assignment
would require agreed specifications, authorised access and explicit AI permission.

Execution evidence is saved in run-evidence.txt.
```

## source-plan.json

```json
{
  "label": "NEW AI-CREATED SYNTHETIC SOURCE FIXTURE; not a real drawing or client record",
  "units": "m",
  "rooms": [
    {"id": "R1", "name": "Fictional ground room", "floor": 0, "width": {"value": 4.0, "certainty": "confirmed"}, "depth": {"value": 3.0, "certainty": "confirmed"}},
    {"id": "R2", "name": "Fictional upper room", "floor": 1, "width": {"value": 3.0, "certainty": "confirmed"}, "depth": {"value": 3.0, "certainty": "confirmed"}}
  ],
  "openings": [
    {"id": "D1", "room": "R1", "kind": "door", "width": {"value": 0.9, "certainty": "confirmed"}},
    {"id": "W1", "room": "R2", "kind": "window", "width": {"value": 1.2, "certainty": "confirmed"}}
  ],
  "fixtures": [{"id": "F1", "room": "R1", "classification": "furniture", "description": "Fictional freestanding wardrobe"}],
  "floor_connections": [{"id": "C1", "from_room": "R1", "to_room": "R2", "kind": "stair"}]
}
```

## model-seeded.json

```json
{
  "label": "NEW AI-CREATED SYNTHETIC MODEL FIXTURE; three deliberate discrepancies",
  "units": "m",
  "display_state": {"revision": "synthetic-rev-1", "hidden_ids": []},
  "rooms": [
    {"id": "R1", "floor": 0, "width": 4.3, "depth": 3.0},
    {"id": "R2", "floor": 1, "width": 3.0, "depth": 3.0}
  ],
  "openings": [{"id": "D1", "room": "R1", "kind": "door", "width": 0.75}, {"id": "W1", "room": "R2", "kind": "window", "width": 1.2}],
  "fixtures": [{"id": "F1", "room": "R1", "classification": "wall"}],
  "floor_connections": [{"id": "C1", "from_room": "R1", "to_room": "R2", "kind": "stair"}]
}
```

## model-corrected.json

```json
{
  "label": "NEW AI-CREATED SYNTHETIC MODEL FIXTURE; the three deliberate discrepancies corrected",
  "units": "m",
  "display_state": {"revision": "synthetic-rev-2", "hidden_ids": []},
  "rooms": [
    {"id": "R1", "floor": 0, "width": 4.0, "depth": 3.0},
    {"id": "R2", "floor": 1, "width": 3.0, "depth": 3.0}
  ],
  "openings": [{"id": "D1", "room": "R1", "kind": "door", "width": 0.9}, {"id": "W1", "room": "R2", "kind": "window", "width": 1.2}],
  "fixtures": [{"id": "F1", "room": "R1", "classification": "furniture"}],
  "floor_connections": [{"id": "C1", "from_room": "R1", "to_room": "R2", "kind": "stair"}]
}
```

## audit.py

```python
"""Synthetic source/model comparison demonstration, not a CAD or safety validator."""
import json
from decimal import Decimal, InvalidOperation
from pathlib import Path


def positive_decimal(value):
    if isinstance(value, bool):
        raise ValueError("Boolean is not a dimension")
    try:
        result = Decimal(str(value))
    except InvalidOperation as exc:
        raise ValueError("Dimension must be numeric") from exc
    if not result.is_finite() or result <= 0:
        raise ValueError("Dimension must be finite and positive")
    return result


def audit(source, model, tolerance="0.01"):
    """Compare this documented fixture schema; uncertain input goes to review."""
    result = {"findings": [], "needs_review": [], "checks_completed": 0}
    limit = Decimal(str(tolerance))
    if not limit.is_finite() or limit < 0:
        raise ValueError("Tolerance must be finite and nonnegative")
    if source.get("units") != "m" or model.get("units") != "m":
        result["needs_review"].append({"code": "units_unconfirmed", "id": "document"})
        return result

    def finding(code, item_id, field, expected, actual):
        result["findings"].append({"code": code, "id": item_id, "field": field,
                                   "expected": expected, "actual": actual})

    def review(code, item_id, field):
        result["needs_review"].append({"code": code, "id": item_id, "field": field})

    def measurement(item, target, field):
        evidence = item.get(field)
        if not isinstance(evidence, dict) or evidence.get("certainty") != "confirmed":
            review("source_ambiguous", item["id"], field)
            return
        try:
            expected = positive_decimal(evidence.get("value"))
        except ValueError:
            review("source_invalid", item["id"], field)
            return
        try:
            actual = positive_decimal(target.get(field))
        except ValueError:
            review("model_invalid", item["id"], field)
            return
        result["checks_completed"] += 1
        if abs(expected - actual) > limit:
            finding("dimension_mismatch", item["id"], field, str(expected), str(actual))

    for collection, fields in (("rooms", ("width", "depth")), ("openings", ("width",))):
        targets = {item["id"]: item for item in model[collection]}
        for item in source[collection]:
            target = targets.get(item["id"])
            if target is None:
                finding("missing_element", item["id"], collection, "present", "absent")
                continue
            for field in fields:
                measurement(item, target, field)

    targets = {item["id"]: item for item in model["fixtures"]}
    for item in source["fixtures"]:
        target = targets.get(item["id"])
        result["checks_completed"] += 1
        actual = None if target is None else target.get("classification")
        if actual != item["classification"]:
            finding("classification_mismatch", item["id"], "classification", item["classification"], actual)

    targets = {item["id"]: item for item in model["floor_connections"]}
    for item in source["floor_connections"]:
        target = targets.get(item["id"])
        result["checks_completed"] += 1
        fields = ("from_room", "to_room", "kind")
        expected = {key: item[key] for key in fields}
        actual = None if target is None else {key: target.get(key) for key in fields}
        if actual != expected:
            finding("connection_mismatch", item["id"], "floor_connection", expected, actual)
    return result


def load_fixture(filename):
    return json.loads(Path(__file__).with_name(filename).read_text(encoding="utf-8"))


if __name__ == "__main__":
    source = load_fixture("source-plan.json")
    for filename in ("model-seeded.json", "model-corrected.json"):
        print(filename)
        print(json.dumps(audit(source, load_fixture(filename)), indent=2))
```

## test_audit.py

```python
import copy
import unittest
from audit import audit, load_fixture


class SourceModelAuditTests(unittest.TestCase):
    def setUp(self):
        self.source = load_fixture("source-plan.json")
        self.corrected = load_fixture("model-corrected.json")

    def test_seeded_model_exposes_exact_three_distinct_discrepancies(self):
        result = audit(self.source, load_fixture("model-seeded.json"))
        self.assertEqual([(x["id"], x["field"]) for x in result["findings"]],
                         [("R1", "width"), ("D1", "width"), ("F1", "classification")])
        self.assertEqual(result["needs_review"], [])

    def test_corrected_revision_clears_all_discrepancies(self):
        result = audit(self.source, self.corrected)
        self.assertEqual(result["findings"], [])
        self.assertEqual(result["needs_review"], [])
        self.assertEqual(result["checks_completed"], 8)

    def test_exact_tolerance_boundary_is_allowed_but_larger_difference_is_not(self):
        self.corrected["rooms"][0]["width"] = 4.01
        self.assertEqual(audit(self.source, self.corrected)["findings"], [])
        self.corrected["rooms"][0]["width"] = 4.0101
        findings = audit(self.source, self.corrected)["findings"]
        self.assertEqual(len(findings), 1)
        self.assertEqual(findings[0]["id"], "R1")

    def test_ambiguous_source_is_reviewed_not_reported_as_a_model_bug(self):
        self.source["rooms"][0]["width"]["certainty"] = "ambiguous"
        self.corrected["rooms"][0]["width"] = 20
        result = audit(self.source, self.corrected)
        self.assertEqual(result["findings"], [])
        self.assertEqual(result["needs_review"], [{"code": "source_ambiguous", "id": "R1", "field": "width"}])

    def test_invalid_dimensions_are_distinguished_from_source_model_discrepancies(self):
        for invalid in (0, -1, True, "NaN", "not-a-dimension"):
            with self.subTest(invalid=invalid):
                source = copy.deepcopy(self.source)
                source["rooms"][0]["width"]["value"] = invalid
                result = audit(source, self.corrected)
                self.assertEqual(result["findings"], [])
                self.assertEqual(result["needs_review"][0]["code"], "source_invalid")
        self.corrected["rooms"][0]["width"] = None
        result = audit(self.source, self.corrected)
        self.assertEqual(result["findings"], [])
        self.assertEqual(result["needs_review"][0]["code"], "model_invalid")

    def test_connection_direction_and_units_are_checked(self):
        self.corrected["floor_connections"][0]["to_room"] = "R1"
        findings = audit(self.source, self.corrected)["findings"]
        self.assertEqual([x["code"] for x in findings], ["connection_mismatch"])
        self.corrected["units"] = "ft"
        result = audit(self.source, self.corrected)
        self.assertEqual(result["findings"], [])
        self.assertEqual(result["needs_review"][0]["code"], "units_unconfirmed")


if __name__ == "__main__":
    unittest.main(verbosity=2)
```

## run-evidence.txt

```text
NEW AI-CREATED SYNTHETIC QA RUN EVIDENCE - NOT CLIENT FINDINGS

UTC: 2026-10-23T23:04:44.869526+00:00

Python: 3.12.14

Command: python -m unittest -v test_audit

Exit code: 0

test_ambiguous_source_is_reviewed_not_reported_as_a_model_bug (test_audit.SourceModelAuditTests.test_ambiguous_source_is_reviewed_not_reported_as_a_model_bug) ... ok
test_connection_direction_and_units_are_checked (test_audit.SourceModelAuditTests.test_connection_direction_and_units_are_checked) ... ok
test_corrected_revision_clears_all_discrepancies (test_audit.SourceModelAuditTests.test_corrected_revision_clears_all_discrepancies) ... ok
test_exact_tolerance_boundary_is_allowed_but_larger_difference_is_not (test_audit.SourceModelAuditTests.test_exact_tolerance_boundary_is_allowed_but_larger_difference_is_not) ... ok
test_invalid_dimensions_are_distinguished_from_source_model_discrepancies (test_audit.SourceModelAuditTests.test_invalid_dimensions_are_distinguished_from_source_model_discrepancies) ... ok
test_seeded_model_exposes_exact_three_distinct_discrepancies (test_audit.SourceModelAuditTests.test_seeded_model_exposes_exact_three_distinct_discrepancies) ... ok

----------------------------------------------------------------------
Ran 6 tests in 0.007s

OK


Command: python audit.py

Exit code: 0

model-seeded.json
{
  "findings": [
    {
      "code": "dimension_mismatch",
      "id": "R1",
      "field": "width",
      "expected": "4.0",
      "actual": "4.3"
    },
    {
      "code": "dimension_mismatch",
      "id": "D1",
      "field": "width",
      "expected": "0.9",
      "actual": "0.75"
    },
    {
      "code": "classification_mismatch",
      "id": "F1",
      "field": "classification",
      "expected": "furniture",
      "actual": "wall"
    }
  ],
  "needs_review": [],
  "checks_completed": 8
}
model-corrected.json
{
  "findings": [],
  "needs_review": [],
  "checks_completed": 8
}
```
