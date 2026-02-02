
# Replace Swaasa with Ankura Hospital in Pipeline Board

Update the pipeline board source node to display "Ankura Hospital" branding instead of "Swaasa".

---

## Logo Required

You'll need to provide an Ankura Hospital logo image. Please upload the logo file in your next message so I can add it to the project.

---

## Change Summary

| File | Action | Description |
|------|--------|-------------|
| `src/assets/ankura-logo.png` | Create | Add uploaded Ankura logo to assets (pending upload) |
| `src/components/customer/pipeline-nodes/SourceNode.tsx` | Modify | Import Ankura logo, update variant type and rendering |
| `src/components/customer/PipelineBoardDialog.tsx` | Modify | Update node labels and IDs to reference Ankura Hospital |

---

## Technical Details

### 1. SourceNode.tsx

**Update imports:**
```tsx
import ankuraLogo from "@/assets/ankura-logo.png";
```

**Update variant type:**
```tsx
variant: "ats" | "ankura";
```

**Update conditional rendering:**
- Replace `isATS` check with `isATS` vs `ankura` logic
- Use Ankura logo image instead of Swaasa logo
- Update alt text to "Ankura Hospital"

### 2. PipelineBoardDialog.tsx

**Update source node (line 33):**
- Change id from `"swaasa"` to `"ankura"`
- Change label from `"Swaasa"` to `"Ankura\nHospital"`
- Change variant from `"swaasa"` to `"ankura"`

**Update stage node (line 36):**
- Change id from `"jobs-swaasa"` to `"jobs-ankura"`
- Change label from `"Jobs in\nSwaasa"` to `"Jobs in\nAnkura"`

**Update edge references (lines 52-54):**
- Change source from `"swaasa"` to `"ankura"`
- Change target from `"jobs-swaasa"` to `"jobs-ankura"`
- Update edge ids accordingly

**Update nodeMetadata (line 90):**
- Change `"jobs-swaasa"` to `"jobs-ankura"`
- Change label from `"Jobs in Swaasa"` to `"Jobs in Ankura Hospital"`

---

## Result

The pipeline board will display:
- **Source node**: Shows "Ankura Hospital" with the Ankura logo
- **First stage**: Shows "Jobs in Ankura" instead of "Jobs in Swaasa"

---

## Next Step

Please upload the Ankura Hospital logo so I can implement these changes.
