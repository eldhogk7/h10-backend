CREATE OR REPLACE FUNCTION generate_exr_id()
RETURNS CHAR(5) AS $$
DECLARE
    chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    result TEXT := '';
BEGIN
    FOR i IN 1..5 LOOP
        result := result || substr(chars, floor(random()*36 + 1)::int, 1);
    END LOOP;
    RETURN result;
END;
$$ LANGUAGE plpgsql;

ALTER TABLE exercise_types ALTER COLUMN "exrId" SET DEFAULT generate_exr_id();

DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN SELECT exercise_type_id FROM exercise_types WHERE "exrId" IS NULL LOOP
        UPDATE exercise_types SET "exrId" = generate_exr_id() WHERE exercise_type_id = r.exercise_type_id;
    END LOOP;
END $$;
