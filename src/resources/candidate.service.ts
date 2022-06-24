import CandidateI from './candidate.interface';
import CandidateRepository from './candidate.repository';
import HttpException from '../utils/exceptions/http.exception';

class CandidateService {
    private CandidateRepository = CandidateRepository;

    /**
     * Create a new Candidate
     */
    public async create(candidate: CandidateI): Promise<CandidateI> {
        try {
            let { first_name, last_name, email, phone, avatar, job_title } =
                candidate;
            const db_candidate = await this.CandidateRepository.create({
                first_name,
                last_name,
                email,
                phone,
                avatar,
                job_title,
            });

            return db_candidate;
        } catch (error) {
            throw new Error('Unable to create Candidate');
        }
    }

    /**
     * get all Candidate
     */

    public async getCandidates(): Promise<CandidateI[] > {
        try {
        var db_candidates = await this.CandidateRepository.findAll();
        } catch (error) {
            throw new Error('Unable to retrieve  Candidate');
        }
        return db_candidates;
    }
    public async getCandidateById(candidate_id: number): Promise<CandidateI> {
        try {
            var db_candidate = await this.CandidateRepository.findOne({
                where: { id: candidate_id },
            });
        } catch (error) {
            throw new Error('Unable to retrieve  Candidate');
        }
        if (!db_candidate) throw new HttpException(404, 'entity not found');
        return db_candidate;
    }
}

export default CandidateService;
